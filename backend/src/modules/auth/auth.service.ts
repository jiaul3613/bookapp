import config from "../../config";
import { pool } from "../../db";
import { passwordHelper } from "../../utils/passwordHelper";
import { IUser } from "./auth.interface";
import jwt from 'jsonwebtoken';

// Auth service
const register = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashedPassword = await passwordHelper.hashPasword(password);

  const result = await pool.query(
    `INSERT INTO book_users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role`,
    [name, email, hashedPassword, role || "user"]
  );

  return result.rows[0];
};

const login = async (email: string, password: string) => {
  // 1. Find user by email
  const isExist = await pool.query(
    `SELECT * FROM book_users WHERE email = $1`,
    [email]
  );

  const user = isExist.rows[0];

  if (!user) {
    const error = new Error("User not found with this email") as Error & {
      statusCode?: number;
    };
    error.statusCode = 404;
    throw error;
  }

  // 2. Verify password against the hashed password in DB
  const isPasswordMatched = await passwordHelper.compareHash(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    const error = new Error("Invalid password") as Error & {
      statusCode?: number;
    };
    error.statusCode = 401;
    throw error;
  }

  // 3. Generate JWT token
  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  //console.log(jwtPayload);
  
  const accessToken = jwt.sign(
    jwtPayload,config.jwt_secret as string,
    { expiresIn: "1d" }
  );

  //console.log(accessToken);

  // 4. Return token and safe user info (without password)
  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

  };

};

//console.log(login);

export const authService = {
  register,login
};
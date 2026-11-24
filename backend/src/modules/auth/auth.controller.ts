import { NextFunction, Request, RequestHandler, Response } from "express";
import { authService } from "./auth.service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate BEFORE calling the service
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
      return;
    }

    // 2. authService.register already returns result.rows[0]
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: unknown) {
    // Handle PostgreSQL unique violation (e.g., duplicate email)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
      return;
    }

    next(error);
  }
};


const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const { user, accessToken } = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user, accessToken },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};


export const authController = { register,login };
import { pool } from "../../db";
import { Ibook } from "./book.interface";

const bookServiceDB = async (payload: Ibook) => {
  const { title, description, author, isbn, total_copies, available_copies } = payload;

  const result = await pool.query(
    `
    INSERT INTO books (title, description, author, isbn, total_copies, available_copies)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [title, description, author, isbn, total_copies, available_copies]
  );

  return result.rows[0];
};


const getBookAllDB = async () => {
  const result = await pool.query(
    `
    SELECT * FROM books
    ORDER BY id DESC
    `
  );

  return result.rows;
};

export const bookService = {
  bookServiceDB,
  getBookAllDB,
    
}

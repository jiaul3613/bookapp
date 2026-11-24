import type { Request, Response } from "express";
import { bookService } from "./book.service";

const bookCreateController = async (req: Request, res: Response) => {
  try {
    const result = await bookService.bookServiceDB(req.body);

    res.status(201).json({
      success: true,
      message: "Book created!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to create book",
      error: error,
    });
  }
};


const getBoolAllController = async (req: Request, res: Response) => {
  try {
    const result = await bookService.getBookAllDB();

    res.status(200).json({
      success: true,
      message: "All book Selected!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to select book",
      error: error,
    });
  }
};


export const bookController = {
  bookCreateController,
  getBoolAllController,
};
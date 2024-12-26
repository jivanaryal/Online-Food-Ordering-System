import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { Request, Response } from "express";

const categoryRespository = AppDataSource.getRepository(Category);
export const getAllCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await categoryRespository.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category(name, description);
    await categoryRespository.save(newCategory);
    res.status(200).json({ message: "new category added", newCategory });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

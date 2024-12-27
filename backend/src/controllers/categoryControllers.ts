import { error } from "console";
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

    if (!name || !description) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const newCategory = new Category(name, description);
    await categoryRespository.save(newCategory);
    res.status(200).json({ message: "new category added", newCategory });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    console.log(id);

    const isCategory = await categoryRespository.findOneBy({ id });
    if (!isCategory) {
      res.status(404).json({ error: "category not found" });
      return;
    }
    res.status(200).json(isCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unkown error occured" });
    }
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const isCategory = await categoryRespository.findOneBy({ id });
    if (!isCategory) {
      res.status(200).json({ error: "category not found" });
      return;
    }

    await categoryRespository.remove(isCategory);
    res
      .status(200)
      .json({ message: "category deleted succesffully", isCategory });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unkown error occured" });
    }
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await categoryRespository.findOneBy({ id });

    if (!category) {
      res.status(404).json({ error: "category not found" });
      return;
    }

    Object.assign(category, { name, description });

    await categoryRespository.save(category);
    res.status(200).json({ message: "category updated sucessfully", category });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unkown error occured" });
    }
  }
};

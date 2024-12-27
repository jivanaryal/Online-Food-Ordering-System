import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { MenuItem } from "../entity/MenuItem";
import { Request, Response } from "express";

const menuItemRepository = AppDataSource.getRepository(MenuItem);

export const getAllMenuItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const menuItem = await menuItemRepository.find({
      relations: ["category"],
    });
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "internal server error " });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || !price || !description || !category) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const menuItem = new MenuItem(name, price, description, category);
    const errors = await validate(menuItem);
    if (errors.length > 0) {
      // Respond with validation errors
      res.status(400).json({ errors: errors.map((err) => err.toString()) });
      return;
    }
    await menuItemRepository.save(menuItem);
    res.status(200).json({ message: "menuItem added sucessfully", menuItem });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
};

export const updateMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    const menuItem = await menuItemRepository.findOneBy({ id });

    if (!menuItem) {
      res.status(404).json({ error: "no menuItem found" });
      return;
    }

    Object.assign(menuItem, { name, price, description, category });

    const errors = await validate(menuItem);

    if (errors.length > 0) {
      res.status(400).json({ errors: errors.map((err) => err.toString()) });
      return;
    }

    await menuItemRepository.save(menuItem);
    res
      .status(200)
      .json({ message: "menuItem updated successfully", menuItem });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
};

export const getMenuItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const menuItem = await menuItemRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!menuItem) {
      res.status(404).json({ error: "No menuITem found" });
      return;
    }

    res.status(200).json(menuItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unkown error occured" });
    }
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const menuItem = await menuItemRepository.findOneBy({ id });
    if (!menuItem) {
      res.status(404).json({ error: "No menuITem found" });
      return;
    }

    await menuItemRepository.remove(menuItem);
    res
      .status(200)
      .json({ message: "menuItem deleted successfully", menuItem });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unkown error occured" });
    }
  }
};

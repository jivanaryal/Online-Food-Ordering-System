import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Orders } from "../entity/Orders";
import { Request, Response } from "express";
import { MenuItem } from "../entity/MenuItem";

const orderRepository = AppDataSource.getRepository(Orders);

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await orderRepository.find({
      relations: ["customer", "menuItems"],
    });
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "internal server error " });
    }
  }
};

export const createOrders = async (req: Request, res: Response) => {
  try {
    const { customer, menuItems, quantity } = req.body; // Change 'menuItems' to 'menuItems'

    console.log(menuItems);

    if (!customer || !menuItems || !quantity) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const menuItemRepository = AppDataSource.getRepository(MenuItem);

    // Fetch the menu item by ID (since only one item can be selected per order)
    const menuItem = await menuItemRepository.findOneBy({ id: menuItems });

    if (!menuItem) {
      res.status(404).json({ error: "Menu item not found" });
      return;
    }

    // Calculate the total price
    const total_price = quantity * menuItem.price;

    // Create the order
    const order = new Orders(customer, menuItem, quantity, total_price); // Pass an array of one item to orders
    const errors = await validate(order);

    if (errors.length > 0) {
      // Respond with validation errors
      res.status(400).json({ errors: errors.map((err) => err.toString()) });
      return;
    }

    // Save the order to the repository
    await orderRepository.save(order);
    res.status(200).json({ message: "Order added successfully", order });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { customer, menuItems, quantity } = req.body;

    const order = await orderRepository.findOneBy({ id });

    if (!order) {
      res.status(404).json({ error: "no order found" });
      return;
    }

    Object.assign(order, { customer, menuItems, quantity });

    const errors = await validate(order);

    if (errors.length > 0) {
      res.status(400).json({ errors: errors.map((err) => err.toString()) });
      return;
    }

    await orderRepository.save(order);
    res.status(200).json({ message: "order updated successfully", order });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await orderRepository.findOne({
      where: { id },
      relations: ["customer", "menuItems"],
    });
    if (!order) {
      res.status(404).json({ error: "No menuITem found" });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unkown error occured" });
    }
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await orderRepository.findOneBy({ id });
    if (!order) {
      res.status(404).json({ error: "No menuITem found" });
      return;
    }

    await orderRepository.remove(order);
    res.status(200).json({ message: "order deleted successfully", order });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unkown error occured" });
    }
  }
};

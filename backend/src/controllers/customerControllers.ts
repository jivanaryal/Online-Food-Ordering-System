import { Request, Response } from "express";
import { Customer } from "../entity/Customer";
import { AppDataSource } from "../data-source";
const customerRepository = AppDataSource.getRepository(Customer);

export const getAllCustomers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customers = await customerRepository.find();
    if (customers.length > 0) {
      res.status(200).json(customers);
    } else {
      res.status(404).json({ message: "No customers found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error has occurred" });
    }
  }
};

export const createCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, address, phone } = req.body;
    const customer = new Customer(name, address, phone);
    await customerRepository.save(customer);
    res
      .status(201)
      .json({ message: "Customer created successfully", customer });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error has occurred" });
    }
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const customer = await customerRepository.findOneBy({ id });

    if (customer) {
      await customerRepository.remove(customer);
      res
        .status(200)
        .json({ message: "Customer deleted successfully", customer });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error has occurred" });
    }
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;
    const customer = await customerRepository.findOneBy({ id });
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    customer.name = name || customer.name;
    customer.address = address || customer.address;
    customer.phone = phone || customer.phone;
    await customerRepository.save(customer);
    res
      .status(200)
      .json({ message: "Customer updated successfully", customer });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
import { DataSource } from "typeorm";
import { Customer } from "./entity/Customer";
import { Orders } from "./entity/Orders";
import { Category } from "./entity/Category";
import { MenuItem } from "./entity/MenuItem";

// Database configuration and entities setup
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root", // MySQL username (root for XAMPP by default)
  password: "password", // MySQL password (leave empty if none)
  database: "food-ordering", // Your database name
  synchronize: true, // Automatically syncs your schema (not recommended for production)
  logging: false, // Set to true for debugging
  entities: [Customer, Orders, Category, MenuItem],
  migrations: [],
  subscribers: [],
});

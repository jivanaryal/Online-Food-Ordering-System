import { DataSource } from "typeorm";
import { Customer } from "./entity/Customer";
import { Orders } from "./entity/Orders";
import { Category } from "./entity/Category";
import { MenuItem } from "./entity/MenuItem";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "food-ordering",
  synchronize: true,
  logging: false,
  entities: [Customer, Orders, Category, MenuItem],
  migrations: [],
  subscribers: [],
});

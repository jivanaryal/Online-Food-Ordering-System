import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { Category } from "./Category";
import { Orders } from "./Orders"; // Import Orders entity

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.menuItems)
  category: Category; // Many-to-one relationship with Category

  // Add the reverse side of the Many-to-Many relationship with Orders
  @ManyToMany(() => Orders, (order) => order.menuItems)
  orders!: Orders[]; // Property to hold related orders

  constructor(
    name: string,
    price: number,
    description: string,
    category: Category
  ) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
  }
}

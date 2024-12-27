import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { IsString, IsNumber, Min } from "class-validator";
import { Orders } from "./Orders"; // Import Orders entity

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  @IsString()
  name: string;

  @Column({ type: "bigint" })
  @IsNumber()
  @Min(0)
  price: number;

  @Column({ type: "varchar" })
  @IsString()
  description: string;

  @ManyToOne(() => Category, (category) => category.menuItems)
  category: Category; // Many-to-one relationship with Category

  // Add the reverse side of the Many-to-Many relationship with Orders
  @OneToMany(() => Orders, (order) => order.menuItems)
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

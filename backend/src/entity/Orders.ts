import { UUID } from "crypto";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./Customer";
import { MenuItem } from "./MenuItem";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  order_date!: Date;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orders)
  @JoinTable()
  menuItems: MenuItem;

  @Column()
  total_price: number;

  @Column()
  quantity: number;

  constructor(
    customer: Customer,
    menuItems: MenuItem,
    quantity: number,
    total_price: number
  ) {
    this.customer = customer;
    this.menuItems = menuItems;
    this.quantity = quantity;
    this.total_price = total_price;
  }
}
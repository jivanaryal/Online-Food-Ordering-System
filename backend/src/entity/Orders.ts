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

  @Column()
  order_date: string;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.orders)
  @JoinTable()
  menuItems: MenuItem[];

  @Column()
  total_price: number;

  @Column()
  quantity: number;

  constructor(
    customer: Customer,
    order_date: string,
    total_price: number,
    menuItems: MenuItem[],
    quantity: number
  ) {
    this.customer = customer;
    this.order_date = order_date;
    this.menuItems = menuItems;
    this.total_price = total_price;
    this.quantity = quantity;
  }
}

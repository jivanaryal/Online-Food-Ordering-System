import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Orders } from "./Orders";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid") // Generates UUID as the primary key
  id!: string; // id will be a string representing the UUID

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => Orders, (order) => order.customer)
  orders!: Orders[];

  constructor(name: string, address: string, phone: string) {
    this.name = name;
    this.address = address;
    this.phone = phone;
  }
}

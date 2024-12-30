import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuItem } from "./MenuItem";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.category)
  menuItems!: MenuItem[];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
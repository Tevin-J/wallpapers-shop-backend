import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, HasOne } from 'sequelize-typescript';
import { Item } from './Item';
import { Promo } from './Promo';

@Table({
  timestamps: true
})
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id!: number;

  @Column
  @AllowNull(false)
  cost!: number;

  @Column
  @AllowNull(false)
  promo!: string;

  @HasMany(() => Item)
  items!: Item[];
}

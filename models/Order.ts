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

  @AllowNull(false)
  @Column
  cost!: number;

  @AllowNull(false)
  @Column
  promo!: string;

  @HasMany(() => Item)
  items!: Item[];
}

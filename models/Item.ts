import { Table, Column, Model, BelongsTo, AllowNull, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Order } from './Order';

@Table({
  timestamps: true
})
export class Item extends Model<Item> {
  @AllowNull(false)
  @PrimaryKey
  @Column
    // null assertion '!' is required in strict mode
    id!: string;

  @AllowNull(false)
  @Column
  url!: string;

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;
}

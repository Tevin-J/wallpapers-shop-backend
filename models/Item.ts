import { Table, Column, Model, BelongsTo, AllowNull, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Order } from './Order';

@Table({
  timestamps: true
})
export class Item extends Model<Item> {
  @Column
  @AllowNull(false)
  @PrimaryKey
    // null assertion '!' is required in strict mode
    id!: string;

  @Column
  @AllowNull(false)
  url!: string;

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;
}

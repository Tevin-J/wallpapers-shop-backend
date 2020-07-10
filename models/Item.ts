import {
  Table,
  Column,
  Model,
  BelongsTo,
  AllowNull,
  PrimaryKey,
  ForeignKey,
  AutoIncrement
} from 'sequelize-typescript';
import { Order } from './Order';

@Table({
  timestamps: true
})
export class Item extends Model<Item> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
    // null assertion '!' is required in strict mode
    id!: number;

  @AllowNull(false)
  @Column
  photoId!: string;

  @AllowNull(false)
  @Column
  url!: string;

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;
}

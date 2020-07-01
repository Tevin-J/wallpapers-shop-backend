import {
  Table,
  Column,
  Model,
  AutoIncrement,
  AllowNull,
  PrimaryKey,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { Order } from './Order';

@Table({
  timestamps: true
})
export class Promo extends Model<Promo> {
  @Column
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  id!: number;

  @Column
  @AllowNull(false)
  title!: string;
}

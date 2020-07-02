import {
  Table,
  Column,
  Model,
  AutoIncrement,
  AllowNull,
  PrimaryKey, Max, Min
} from 'sequelize-typescript';

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

  @Column
  @Min(5)
  @Max(90)
  @AllowNull(false)
  discount!: number;
}

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
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  title!: string;

  @Min(5)
  @Max(90)
  @AllowNull(false)
  @Column
  discount!: number;
}

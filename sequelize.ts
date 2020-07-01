import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: 'photos',
  dialect: 'sqlite',
  username: 'root',
  password: '123456',
  host: 'localhost',
  models: [__dirname + '/models']
});

import { Sequelize } from 'sequelize-typescript';
import fs from 'fs';

const dbPath = './shop.sqlite3';
// check if db file exists. if not - create a db file.
if (!fs.existsSync(dbPath)) {
  fs.open(dbPath, 'r+', (err => {
    if (err) throw err;
    console.log('db has been created');
  }));
}
export const sequelize = new Sequelize({
  database: 'shop',
  storage: dbPath,
  dialect: 'sqlite',
  username: 'root',
  password: '123456',
  host: 'localhost',
  models: [__dirname + '/models']
});

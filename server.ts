import { sequelize } from './sequelize';
import { app } from './app';

// if data in models and in db are not equal, need to sync() first, then need to use authenticate()
// sequelize.sync()
sequelize.authenticate()
  .then(() => app.listen(3000, () => {
      console.log('server has been started');
    })
  );

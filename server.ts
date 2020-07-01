import { sequelize } from './sequelize';
import { app } from './app';

// synchronizing all the models
sequelize.sync({ force: true })

  .then(() => app.listen(3000, () => {
      console.log('server has been started');
    })
  );

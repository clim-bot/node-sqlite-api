const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

(async () => {
  try {
    // Disable foreign keys temporarily
    await sequelize.query('PRAGMA foreign_keys = OFF;');

    // Sync the models (force true will drop and recreate all tables)
    await sequelize.sync({ alter: true });

    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    // Re-enable foreign keys
    await sequelize.query('PRAGMA foreign_keys = ON;');
  }
})();

module.exports = sequelize;

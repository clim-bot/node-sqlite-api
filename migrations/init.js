const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

(async () => {
  try {
    // Disable foreign keys temporarily
    await sequelize.query('PRAGMA foreign_keys = OFF;');

    // Sync the models (alter: true will modify the existing tables)
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');

    // Create the Users_backup table if it doesn't exist
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Users_backup (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `);

    // Insert data into Users_backup, ignoring rows with duplicate email
    await sequelize.query(`
      INSERT OR IGNORE INTO Users_backup (name, email, password)
      SELECT name, email, password FROM Users;
    `);

    console.log('Backup of Users table completed successfully.');
  } catch (error) {
    console.error('Error syncing database or creating backup:', error);
  } finally {
    // Re-enable foreign keys
    await sequelize.query('PRAGMA foreign_keys = ON;');
    console.log('Foreign keys re-enabled.');
  }
})();

module.exports = sequelize;

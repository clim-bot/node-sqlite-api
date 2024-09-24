const { defineConfig } = require('cypress');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const User = require('./models/user');
const Book = require('./models/book');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Task for direct SQL queries (for other operations)
      on('task', {
        async queryDb(query) {
          const db = await open({
            filename: './database.sqlite',
            driver: sqlite3.Database,
          });

          try {
            const result = await db.all(query);
            await db.close();
            return result;
          } catch (error) {
            console.error('Error executing query:', error);
            await db.close();
            throw error;
          }
        },

        // Task to create a user with Sequelize to trigger hooks (like password hashing)
        async createUser({ name, email, password }) {
          try {
            const user = await User.create({ name, email, password });
            return user;
          } catch (error) {
            console.error('Error creating user:', error);
            throw error;
          }
        },

        async createBook({ title, author, userId }) {
          try {
            const book = await Book.create({ title, author, userId });
            return book;
          } catch (error) {
            console.error('Error creating book:', error);
            throw error;
          }
        },

        // Task for querying books
        async getBooks(query) {
          try {
            const books = await Book.findAll(query);
            return books;
          } catch (error) {
            console.error('Error querying books:', error);
            throw error;
          }
        },

        // Task for deleting a book by title
        async deleteBookByTitle(title) {
          try {
            const result = await Book.destroy({ where: { title } });
            return result;
          } catch (error) {
            console.error('Error deleting book:', error);
            throw error;
          }
        },
      });

      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
  },
});

const sequelize = require('./init');
const User = require('../models/user');
const Book = require('../models/book');

const seedUsers = [
  { name: 'Alice', email: 'alice@example.com', password: 'password123' },
  { name: 'Bob', email: 'bob@example.com', password: 'password123' },
  { name: 'Charlie', email: 'charlie@example.com', password: 'password123' },
  { name: 'Dave', email: 'dave@example.com', password: 'password123' },
  { name: 'Eve', email: 'eve@example.com', password: 'password123' },
];

const seedBooks = [];
for (let i = 1; i <= 100; i++) {
  seedBooks.push({
    title: `Book Title ${i}`,
    author: `Author ${i}`,
    userId: (i % 5) + 1  // Assign books to users in a cyclic manner
  });
}

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced and cleared.');

    await User.bulkCreate(seedUsers);
    console.log('Seeded users.');

    await Book.bulkCreate(seedBooks);
    console.log('Seeded books.');

    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();

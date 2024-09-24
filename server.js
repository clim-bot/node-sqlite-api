const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const sequelize = require('./migrations/init');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', async () => {
  await sequelize.authenticate();
  console.log(`Server is running on port ${PORT}`);
});

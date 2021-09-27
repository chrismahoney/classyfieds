const { config } = require('dotenv');
const express = require('express');

const connectDb = require('./config/db');

const app = express();
connectDb();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Classyfieds API Ready.');
});

app.listen(
  process.env.PORT || 3000,
  () => console.log('Classyfieds API loaded OK.')
);
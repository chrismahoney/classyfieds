const { config } = require('dotenv');
const express = require('express');
const connectDb = require('./config/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { listings } = require('./routes/index');

const app = express();
connectDb();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Classyfieds REST API',
      description: 'A REST API built to support Classyfieds listings on the frontend UI.'
    }
  },
  apis: ['./routes/listings.js']
}

app.use(express.json());
app.use('/listings', listings);

app.get('/', (req, res) => {
  res.send('Classyfieds API Ready.');
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(
  process.env.PORT || 3000,
  () => console.log('Classyfieds API loaded OK.')
);
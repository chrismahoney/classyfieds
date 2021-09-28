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
    openapi: '3.0.0',
    info: {
      title: 'Classyfieds REST API',
      description: 'A REST API built to support Classyfieds listings on the frontend UI.'
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic'
        }
      }
    },
    security: {
      basicAuth: [ ]
    }
  },
  apis: ['./routes/listings.js']
}

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

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
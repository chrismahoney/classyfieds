const { config } = require('dotenv');
const express = require('express');
const connectDb = require('./config/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { listings } = require('./routes/index');
const User = require('./models/user');

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
    }
  },
  apis: ['./routes/listings.js']
}

/*
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
*/

app.use(express.json());
app.use('/listings', listings);

app.get('/', (req, res) => {
  res.send('Classyfieds API Ready.');
});

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!(email && password)) {
      res.status(400).send("Missing input, email and password required.");
    }

    // CHeck against user db for existing
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(409).send("User already exists.");
    }

    // Encrypt incoming password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user record
    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    // Create user token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    );

    // Save token
    user.token = token;

    // Return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post('/login', (req, res) => {

});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(
  process.env.PORT || 3000,
  () => console.log('Classyfieds API loaded OK.')
);
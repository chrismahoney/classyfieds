const { config } = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const { listings } = require('./routes/index');
const User = require('./models/user');

const app = express();
connectDb();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    servers: [
      {
        url: '/'
      }
    ],
    info: {
      title: 'Classyfieds REST API',
      description: 'A REST API built to support Classyfieds listings on the frontend UI.'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
  },
  apis: ['./routes/listings.js']
}

const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/listings', listings);

app.get('/', (req, res) => {
  res.send('Classyfieds API Ready.');
});

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!(email && password)) {
      res.status(400).send({ error: "Missing input, email and password required." });
    }

    // CHeck against user db for existing
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(409).send({ error: "User already exists." });
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
    return res.status(201).json(user);
    
  } catch (err) {
    console.log(err);
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    // Get login input
    const { email, password } = req.body;

    // Validate
    if (!(email && password)) {
      res.status(400).send({ error: "Missing input, email and password required." });
    }

    // Find valid user
    const user = await User.findOne({ email });

    // Check password and create/save token if valid
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      );

      // Save token
      user.token = token;

      // Respond with user
      return res.status(200).json(user);
    }

    return res.status(400).send({
      error: "Invalid credentials"
    });
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(
  process.env.PORT || 5000,
  () => console.log('Classyfieds API loaded OK.')
);
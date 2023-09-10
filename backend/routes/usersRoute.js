import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config.js';

import { User } from '../models/userModel.js';
import { hashPassword } from '../helpers/hashpassword.js';

const router = express.Router();

router.use(cors());

// // Middleware для перевірки аутентифікації
// const authenticateUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ msg: 'Authentication failed' });
//   }

//   jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ msg: 'Invalid token' });
//     }

//     req.user = decodedToken;
//     next();
//   });
// };

//middleware for verifying user
async function verifyUser(req, res, next) {
  try{
    const { email } = req.method == 'GET' ? req.query : req.body;

    let exist = await User.findOne({ email });
    if (!exist) return res.status(404).send({ error: 'Can`t find User!' });
    next();
  } catch (err) {
    return res.status(404).send({ error: "Authentification Error" })
  }
}

//middleware for authenticating
async function authenticate(req, res, next) {
  try{
    const token = req.headers.authorization.split('')[1];

    const decodedToken = await jwt.verify(token, 'secret');

    req.user = decodedToken;

    next();
  } catch (err) {
    res.status(401).send({ error: 'Authentification Failed!' })
  }
}

// GET запит на отримання всіх користувачів
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Роут реєстрації
router.post('/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Будь ласка, заповніть усі поля' });
    }

    if (name.length < 2) {
      return res.status(400).json({ msg: 'Ім\'я має бути мінімум 2 символи' });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: 'Пароль має бути мінімум 6 символів' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'Користувач з таким email вже існує' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
    });
  } catch (error) {
      return res.status(500).send({ error });
  }
});

// Роут авторизації
router.post('/auth', verifyUser, async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    if(match) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          name: user.name,
        },
        'secret',
        { expiresIn: '24h'},
      );
      return res.status(200).send({
        msg: 'Login successful',
        name: user.name,
        token
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Роут для отримання профілю користувача
router.get('/:name', async (req, res) => {

  const { name } = req.params;

  try {
    
    if (!name) return res.status(501).send({ error: 'Invalid Username' });

    const user = await User.findOne({ name });

    if (!user) return res.status(501).send({ error: 'User not found' });
    
    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(201).send(rest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;

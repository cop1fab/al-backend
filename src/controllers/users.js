import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import models from '../models/index';

dotenv.config();
const User = models.user;
const secretKey = process.env.secretOrKey;
const expirationTime = {
  expiresIn: '50day'
};

/**
  * @param {class} --UserController
  */
class UserController {
  /**
   *
   * @param {Object} req -requestesting from user
   * @param {Object} res -responding from user
   * @returns {Object} Response with status of 201
   */
  signup(req, res) {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    User.create(newUser)
      .then((user) => {
        const payload = {
          id: user.id,
          name: user.username
        };
        // @creating jwt token
        const token = jwt.sign(payload, process.env.secretOrKey, { expiresIn: '1day' });
        return res.status(201).json({ status: 201, token: `Bearer ${token}`, user });
      })
      .catch(error => res.status(500).json({ error }));
  }

  /**
   *
   * @param {Object} req -requestesting from user
   * @param {Object} res -responding from user
   * @returns {Object} Response with status of 201
   */
  login(req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    return User.findOne({ where: { email: user.email } })
      .then((foundUser) => {
        if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
          const payload = {
            username: foundUser.username,
            email: foundUser.email,
          };
          const token = jwt.sign(payload, secretKey, expirationTime);
          res.status(200).json({ status: 200, token, user: payload });
        } else {
          res.status(400).json({ status: 400, error: 'Incorrect username or password' });
        }
      }).catch((error) => {
        res.status(500).json({ error });
      });
  }
}

export default new UserController();

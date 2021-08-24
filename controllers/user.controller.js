const { User } = require('../database');
const { responseCodesEnum } = require('../constants');
const { passwordHasher } = require('../helpers');

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.find({});

    res.json(users);
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await User.create({...req.body, password: hashedPassword });

      res.status(responseCodesEnum.CREATED).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  deleteUserById: (req, res) => {
    const { user } = req;

    res.status(responseCodesEnum.NO_CONTENT).json(user);
  },

  getUserById: (req, res) => {
    const { user } = req;

    res.json(user);
  },

  updateUsers: (req, res, next) => {
     try {
       const { body } = req.body;

       res.json(body)
     } catch (e) {
       next(e);
     }
  }
};

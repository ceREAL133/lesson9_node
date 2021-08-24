const { constants: {AUTHORIZATION}, emailActionsEnum } = require('../constants');
const { OAuth } = require('../database');
const { authHelper, passwordHasher } = require('../helpers');
const { mailService } = require('../services');

module.exports = {
  login: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('Wrong email or password');
      }
      
      const { password: hashPassword, _id, email } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashPassword, password);
      await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: 'Dan' })

      const tokenPair = authHelper.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: _id });

      res.json({
        ...tokenPair,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION)

      await Oauth.remove({ accessToken: token });

      await mailService.sendMail('rlejko13@gmail.com', emailActionsEnum.PASSWORD_CHANGED, {userName: 'TEST'})

      await OAuth.remove({accessToken: token});
      res.status(204).json('Success')
    } catch (e) {
      next(e);
    }
  },

  refresh: (req, res, next) => {
    try {
      const { body } = req;

      res.json(body);
    } catch (e) {
      next(e);
    }
  }
};
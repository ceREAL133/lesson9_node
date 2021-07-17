const userRolesEnum = require('../constants/user.roles.enum');
const { User } = require('../database');

module.exports = {
  checkIsUserPresent: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = await User.findById(userId);

      console.log(userById);

      if (!userById) {
        throw new Error('user not found');
      }

      req.user = userById;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsAdminMiddleware: (req, res, next) => {
    try {
      const { role } = req.user;

      if (role !== userRolesEnum.ADMIN) {
        throw new Error('Not admin');
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};

const { User } = require('../database');

module.exports = {
 
  // FOR FUTURE
  getUserByParamsInternal: (id) => {
    return User.findById(id).select('+password +token -email');
  },

};

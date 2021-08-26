const path = require('path');
const uuid = require('uuid').v1;
const fs = require('fs');
const { promisify } = require('util');

const { User } = require('../database');
const { responseCodesEnum } = require('../constants');
const { passwordHasher } = require('../helpers');

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.find({});

    res.json(users);
  },

  createUser: async (req, res, next) => {
    try {
      const { 
        documents, 
        videos, 
        photos, 
        body: { password } 
      } = req;

      const [avatar] = photos;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await User.create({...req.body, password: hashedPassword });

      const {_id} = createdUser;

      if (avatar){
        const pathWithoutStatic = path.join('users', _id.toString(), 'photos');
        const uploadPath = path.join(process.cwd(), 'static', pathWithoutStatic);

        const fileExtension = avatar.name.split('.').pop();
        const photoName = `${uuid()}.${fileExtension}`;
        const finalPath = path.join(uploadPath, photoName);
  
        await mkdirPromise (uploadPath, {recursive: true});
        await avatar.mv(finalPath);

        await User.updateOne({_id}, {avatar: path.join(pathWithoutStatic, photoName)})
      }
      

      res.status(responseCodesEnum.CREATED).json({ });
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

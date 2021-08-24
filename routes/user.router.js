const router = require('express').Router();

const { userRolesEnum } = require('../constants')
const userController = require('../controllers/user.controller');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
userMiddleware.checkUserValidity, 
userMiddleware.checkIsEmailExist, 
userController.createUser);

router.use('/:userId', userMiddleware.getUserByDynamicParam('userId', 'params'))

router.route('/:userId') /////////////////////////////////////////////////////////
    .delete(userMiddleware.checkUserRole([userRolesEnum.ADMIN]) ,userController.deleteUserById)    
    .get(userController.getUserById)
    .put(userController.updateUsers)

// router.delete('/:userId', userController.deleteUserById);
// router.get('/:userId', userController.getUserById);
// router.put('/:userId', userController.updateUsers);

module.exports = router;

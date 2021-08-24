const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/login', userMiddleware.getUserByDynamicParam('email'), authController.login);
router.post('/logout',authMiddleware.checkAccessToken, authController.logout);

module.exports = router;
const router = require('express').Router();
const userController = require('../controllers/user.controller')

router.post('/auth/signup/', userController.createUser);
router.delete('/auth/signout/:id', userController.deleteUser)
router.post('/signin/', userController.signin);

module.exports = router;

const { Router } = require('express');
const AuthController = require('../controllers/auth.controllers');
const ProfileController = require('../controllers/profile.conrtrollers');
const UserController = require('../controllers/user.controllers');
const NewsConrtroller = require('../controllers/news.conrtrollers');
const AuthMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('/login', AuthMiddleware.login, AuthController.login);
router.post('/registration', AuthMiddleware.regisration, AuthController.registration);
router.post('/refresh-token', AuthController.refreshToken);

router.get('/profile', ProfileController.profile);
router.patch('/profile', ProfileController.updateProfile);

router.get('/news', NewsConrtroller.news);
router.post('/news', NewsConrtroller.createNews);
router.patch('/news/:id', NewsConrtroller.updateNews);
router.delete('/news/:id', NewsConrtroller.deleteNews);

router.get('/users', UserController.users);
router.patch('/users/:id/permission', UserController.permissionUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;

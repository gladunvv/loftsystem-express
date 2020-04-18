const { Router } = require('express');
const AuthController = require('../controllers/auth.controllers');
const ProfileController = require('../controllers/profile.conrtrollers');
const UserController = require('../controllers/user.controllers');
const NewsConrtroller = require('../controllers/news.conrtrollers');
const AuthMiddleware = require('../middleware/auth.middleware');
const TokenMiddleware = require('../middleware/token.middleware');
const router = Router();

router.post('/login', AuthMiddleware.login, AuthController.login);
router.post('/registration', AuthMiddleware.regisration, AuthController.registration);
router.post('/refresh-token', AuthController.refreshToken);

router.get('/profile', TokenMiddleware.isAuth, ProfileController.profile);
router.patch('/profile', TokenMiddleware.isAuth, ProfileController.updateProfile);

router.get('/news', TokenMiddleware.isAuth, NewsConrtroller.news);
router.post('/news', TokenMiddleware.isAuth, NewsConrtroller.createNews);
router.patch('/news/:id', TokenMiddleware.isAuth, NewsConrtroller.updateNews);
router.delete('/news/:id', TokenMiddleware.isAuth, NewsConrtroller.deleteNews);

router.get('/users', TokenMiddleware.isAuth, UserController.users);
router.patch('/users/:id/permission', TokenMiddleware.isAuth, UserController.permissionUser);
router.delete('/users/:id', TokenMiddleware.isAuth, UserController.deleteUser);

module.exports = router;

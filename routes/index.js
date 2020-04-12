const { Router } = require('express');
const AuthController = require('../controllers/auth.controllers')

const router = Router();


router.post('/registration', AuthController.registration);

module.exports = router;
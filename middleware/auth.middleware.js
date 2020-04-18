const { check } = require('express-validator');

module.exports.regisration = [
  check('username')
    .exists()
    .withMessage('Введите имя пользователя')
    .isLength({ min: 3 })
    .withMessage('Слишком короткое имя пользователя'),

  check('passwordConfirm').exists().withMessage('Подтвердите пароль'),

  check('password')
    .exists()
    .withMessage('Введите пароль')
    .custom((value, { req, loc, path }) => {
      if (value != req.body.passwordConfirm) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    }),
];

module.exports.login = [
  check('username')
    .exists()
    .withMessage('Введите имя пользователя')
    .isLength({ min: 3 })
    .withMessage('Слишком короткое имя пользователя'),

  check('password').exists().withMessage('Введите пароль'),
];

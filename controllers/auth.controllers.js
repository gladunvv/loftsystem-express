const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const {tokensGenerate} = require('../helpers/tokens.helpers')


module.exports.registration = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: errors.errors[0].msg,
      });
    }

    const { username, surName, firstName, middleName, password } = req.body;

    const candidate = await User.findOne({ username });

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует!' });
    }



    const hashedPasswrod = await bcrypt.hash(password, 12);
    const newUser = { username, password: hashedPasswrod, surName, firstName, middleName };
    const user = new User(newUser);

    const a = tokensGenerate(user)
    console.log('a ', a);

    // await user.save();

    res.status(201).json({ message: 'Пользователь создан' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', err: e.message });
  }
};

module.exports.login = (req, res) => {
  console.log('login: ', req.body);
};

module.exports.refreshToken = (req, res) => {
  console.log('refresh-token :', req.body);
};

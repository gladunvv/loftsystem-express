const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { tokensGenerate, tokenGetPayload } = require('../helpers/tokens.helpers');

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
    const permission = {
      chat: { C: true, D: true, R: true, U: true },
      news: { C: true, D: true, R: true, U: true },
      settings: { C: true, D: true, R: true, U: true },
    };
    const user = new User({ ...newUser, permission });
    const tokens = tokensGenerate(user);
    await user.save();
    const responseData = {
      id: user.id,
      image: user.image,
      username,
      surName,
      firstName,
      middleName,
      ...permission,
      ...tokens,
    };
    res.status(201).json({ ...responseData });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', err: e.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: errors.errors[0].msg,
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json(`Пользователь ${username} не найден`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
    }
    const tokens = tokensGenerate(user);
    responseData = {
      id: user.id,
      image: user.image,
      username: user.username,
      surName: user.surName,
      firstName: user.firstName,
      middleName: user.middleName,
      permission: user.permission,
      ...tokens,
    };
    res.status(200).json({ ...responseData });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', err: e.message });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const payload = tokenGetPayload(token);
    const user = await User.findOne({ _id: payload.id });

    const tokens = tokensGenerate(user);
    res.status(200).json({ ...tokens });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', err: e.message });
  }
};

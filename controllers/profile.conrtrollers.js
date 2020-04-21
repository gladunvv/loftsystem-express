const User = require('../models/User');
const formidable = require('formidable');
const path = require('path');
const config = require('config');
const fsex = require('fs-extra');
const toBase64 = require('../helpers/encodeBase64');
const bcrypt = require('bcryptjs');
const { resizePhoto } = require('../helpers/resize.helpers');

module.exports.profile = async (req, res) => {
  try {
    const user = req.user;
    const response = {
      id: user._id,
      username: user.username,
      surName: user.surName,
      firstName: user.firstName,
      middleName: user.middleName,
      permission: user.permission,
      image: user.image,
    };
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    user = req.user;
    const form = new formidable.IncomingForm();
    const upload = path.join(config.upload);
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return next(err);
      }
      let image = user.imgage;
      if (files.avatar) {
        const fileName = path.join(upload, files.avatar.name);
        fsex.moveSync(files.avatar.path, fileName);
        const resizePath = await resizePhoto(fileName);
        image = await toBase64.encode(resizePath, files.avatar.type);
      }
      let password = user.password;
      const { oldPassword, newPassword } = fields;
      if (oldPassword && newPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
        }
        password = await bcrypt.hash(newPassword, 12);
      }
      const updateUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { ...fields, password, image },
        { new: true },
      );
      const response = {
        id: updateUser._id,
        username: updateUser.username,
        surName: updateUser.surName,
        firstName: updateUser.firstName,
        middleName: updateUser.middleName,
        permission: updateUser.permission,
        image: image,
      };
      res.status(201).json(response);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

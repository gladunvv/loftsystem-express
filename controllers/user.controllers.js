const User = require('../models/User');

module.exports.users = async (req, res) => {
  try {
    const userlist = await User.find();

    const formattedUserList = await Promise.all(
      userlist.map(async (user) => {
        return {
          id: user._id,
          username: user.username,
          surName: user.surName,
          firstName: user.firstName,
          middleName: user.middleName,
          permission: user.permission,
        };
      }),
    );
    res.status(201).json(formattedUserList);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

module.exports.permissionUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { permission } = req.body;

    await User.findOneAndUpdate({ _id: id }, { permission });

    res.status(200).json({ message: 'Права пользователя изменены' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findOneAndDelete({ _id: id });
    res.status(200).json({ message: 'Пользователь удалён' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

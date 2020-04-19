const News = require('../models/News');
const User = require('../models/User');
const uuid = require('uuid').v4;

module.exports.news = async (req, res) => {
  try {
    const news = await News.find();
    console.log('news :', news);
    res.status(200).json(news);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', error: e.message });
  }
};

module.exports.createNews = async (req, res) => {
  try {
    const user = req.user;
    const { title, text } = req.body;
    const owner = await User.findOne({ _id: user.id });
    const newNews = new News({
      id: uuid(),
      created_at: new Date(),
      text,
      title,
      user: {
        firstName: owner.firstName,
        id: owner.id,
        image: owner.image,
        middleName: owner.middleName,
        surName: owner.surName,
        username: owner.username,
      },
    });

    await newNews.save();
    const news = await News.find();

    res.status(201).json({ news });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', error: e.message });
  }
};

module.exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;

    await News.findOneAndUpdate({ id }, { text, title });

    const news = await News.find();
    res.status(200).json(news);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', error: e.message });
  }
};

module.exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    await News.findOneAndDelete({ id });
    const news = await News.find();
    res.status(200).json(news);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', error: e.message });
  }
};

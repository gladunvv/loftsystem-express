module.exports.news = (req, res) => {
  console.log('get news: ', req.body);
};

module.exports.createNews = (req, res) => {
  console.log('create news: ', req.body);
};

module.exports.updateNews = (req, res) => {
  console.log('update news: ', req.body);
};

module.exports.deleteNews = (req, res) => {
  console.log('delete news: ', req.body);
};

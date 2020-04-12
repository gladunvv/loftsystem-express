module.exports.registration = (req, res) => {
  console.log('registration: ', req.body);
};

module.exports.login = (req, res) => {
  console.log('login: ', req.body);
};

module.exports.refreshToken = (req, res) => {
  console.log('refresh-token :', req.body);
};

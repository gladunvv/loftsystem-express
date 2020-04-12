module.exports.users = (req, res) => {
  console.log('get users: ', req.body);
};

module.exports.permissionUser = (req, res) => {
  console.log('update permission user: ', req.body);
};

module.exports.deleteUser = (req, res) => {
  console.log('delete user: ', req.body);
};

jwt = require('jsonwebtoken');
config = require('config');

module.exports.tokensGenerate = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const secret = config.get('jwtSecret');

  const tokenEx = config.get('tokenLife');
  const refreshTokenEx = config.get('refreshTokenLife');
  const token = jwt.sign(payload, secret, { expiresIn: tokenEx });
  const refreshToken = jwt.sign(payload, secret, { expiresIn: refreshTokenEx });

  const data = {
    accessToken: token,
    refreshToken: refreshToken,
    accessTokenExpiredAt: jwt.verify(token, secret).exp * 1000,
    refreshTokenExpiredAt: jwt.verify(refreshToken, secret).exp * 1000,
  };
  return data;
};

module.exports.tokenGetPayload = (token) => {
  secret = config.get('jwtSecret');
  payload = jwt.verify(token, secret);
  return payload;
};

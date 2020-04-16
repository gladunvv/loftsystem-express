const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  surName: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  image: { type: String },
  password: { type: String, required: true },
  permission: {
    chat: {
      C: { type: Boolean },
      R: { type: Boolean },
      U: { type: Boolean },
      D: { type: Boolean },
    },
    news: {
      C: { type: Boolean },
      R: { type: Boolean },
      U: { type: Boolean },
      D: { type: Boolean },
    },
    settings: {
      C: { type: Boolean },
      R: { type: Boolean },
      U: { type: Boolean },
      D: { type: Boolean },
    },
  },
});

module.exports = model('User', schema);

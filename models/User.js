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
      C: Boolean,
      R: Boolean,
      U: Boolean,
      D: Boolean,
    },
    news: {
      C: Boolean,
      R: Boolean,
      U: Boolean,
      D: Boolean,
    },
    settings: {
      C: Boolean,
      R: Boolean,
      U: Boolean,
      D: Boolean,
    },
  },
});

module.exports = model('User', schema);

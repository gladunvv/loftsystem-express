const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now },
  text: String,
  title: String,
  user: {
    firstName: String,
    id: String,
    image: String,
    middleName: String,
    surName: String,
    username: String,
  },
});

module.exports = model('News', schema);

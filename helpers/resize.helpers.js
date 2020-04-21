const Jimp = require('jimp');
const path = require('path');
const config = require('config');

module.exports.resizePhoto = async (filePath) => {
  try {
    const fileDir = path.dirname(filePath);
    const image = await Jimp.read(filePath);
    await image.resize(250, 250);
    const nameImage = `${Date.now()}_250x250.png`;
    await image.writeAsync(path.join(config.upload, nameImage));
    return path.join(fileDir, nameImage);
  } catch (e) {
    console.log('error: ', e);
  }
};

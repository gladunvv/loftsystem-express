const Jimp = require('jimp');
const path = require('path');
const config = require('config');
const fs = require('fs');

module.exports.resizePhoto = async (filePath) => {
  try {
    console.log('filePath :', filePath);
    const image = await Jimp.read(filePath);
    await image.resize(250, 250);
    
    const fileName = `${Date.now()}_250x250.png`
    await image.writeAsync(path.join(config.upload, fileName));
    fs.unlinkSync(filePath);
    return path.join('upload', fileName)
  } catch (e) {
    console.log('error: ', e);
  }
};

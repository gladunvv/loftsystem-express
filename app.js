const express = require('express');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const { socketServer } = require('./services/socket.service');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));
app.use('/', express.static(path.join(__dirname, 'client', 'build')));

app.use('/api', require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

io.on('connection', socketServer);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    if (!fs.existsSync(config.upload)) {
      fs.mkdirSync(config.upload, { recursive: true });
    }
    server.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();

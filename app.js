const express = require('express');
const path = require('path');
const config = require('config');

const app = express();

const PORT = config.get('port');


app.use(express.json({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));
app.use('/', express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use('/api', require('./routes'))

async function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();

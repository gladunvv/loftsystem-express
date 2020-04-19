const Chat = require('../models/Chat');

const users = new Array();

module.exports = {
  socketServer: function (socket) {
    socket
      .on('users:connect', ({ userId, username }) => {
        console.log(`${username} connected`);

        const candidate = {
          username,
          socketId: socket.id,
          userId,
          activeRoom: null,
        };
        users.push(candidate);

        socket.emit('users:list', users);
        socket.broadcast.emit('users:add', candidate);
      })
      .on('message:add', async (message) => {
        let dialog = new Object();

        const newMessage = new Chat(message);
        await newMessage.save();

        users.forEach((user) => {
          if (user.userId === message.recipientId) dialog.to = user.socketId;
          if (user.userId === message.senderId) dialog.from = user.socketId;
        });

        dialog.from === dialog.to
          ? socket.emit('message:add', message)
          : this.to(dialog.from).to(dialog.to).emit('message:add', message);
      })
      .on('message:history', async (dialog) => {
        const isMatchPersons = (dialog, msg) => {
          if (
            (dialog.recipientId === msg.recipientId && dialog.userId === msg.senderId) ||
            (dialog.recipientId === msg.senderId && dialog.userId === msg.recipientId)
          ) {
            return true;
          }
          return false;
        };
        const history = (await Chat.find()).filter((msg) =>
          isMatchPersons(dialog, msg) ? true : false,
        );

        socket.emit('message:history', history);
      })
      .on('disconnect', () => {
        users.forEach((user, index) => {
          if (user.socketId === socket.id) users.splice(index, 1);
        });

        socket.broadcast.emit('users:leave', socket.id);
      });
  },
};

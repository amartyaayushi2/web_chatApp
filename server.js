const io = require("socket.io")(3000);

const users = {};
// console.log("hello console user");
io.on("connection", socket =>{
    socket.on('new-user', name=>{
        users[socket.id]=name;
        socket.broadcast.emit(`user-connected`, name);

    });
    console.log("hello new user");
    // socket.emit('chat-message', 'Hello Everyone, Welcome to my first chat app');
    socket.on('send-chat-message', message=>{
        // console.log(message);
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
      });
});
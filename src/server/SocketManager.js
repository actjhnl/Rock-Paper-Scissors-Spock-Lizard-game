const io = require('./index.js').io;
var parsedUrl = require('url');

let waitingRooms = {};//комнаты,где ожидают второго игрока

module.exports = (socket) => {
  console.log(`Socket ID ${socket.id}`);
  const url = parsedUrl.parse(socket.handshake.headers.referer).query;
  // 1
  socket.on('start',(room)=>{
    console.log(`===================     =======================`)
    console.log(waitingRooms)
    console.log(`===================     =======================`)
    if(url === null) {
      socket.join(room);
      if(!waitingRooms[room])
        waitingRooms[room] = true;
      console.log('создана комната ' + room);
      console.log(`человек в комнате ${io.sockets.adapter.rooms[room].length}`)
    }
    else if (waitingRooms[url] && io.sockets.adapter.rooms[url].length === 1){
        socket.join(url);
        console.log('присоединен к комнате '+ url);
        console.log(`человек в комнате ${io.sockets.adapter.rooms[url].length}`);
        io.sockets.in(url).emit('ready');
        delete waitingRooms[url];
    }
    else if (!waitingRooms[url] || io.sockets.adapter.rooms[url].length > 2){
      // + сообщений, что запрашиваемые комнаты недоступны, но вы можете начать игру по ссылке в форме
      socket.join(room);
      if(!waitingRooms[room])
        waitingRooms[room] = true;
    } // лишний и фейк
    else {
      console.log("The room is undefined. You can start game");
      //socket.emit('err');
    }

  })
  // 2
  socket.on('message',(body)=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit('message',{
      body,
      from: 'Opponent'//socket.id.slice(8)
    });
  })
  // 3
  socket.on('gesture',(gesture)=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit('result',{
      gesture,
      from: socket.id
    });
  })
  //
  socket.on('exit',()=>{
      let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
      socket.leave(room);
      socket.broadcast.to(room).emit('opponentLeave');
  })
  //
  socket.on('playInvitation',()=>{// отправляю второму игроку предложение сыграть еще раз
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit('playInvitation');
  })
  socket.on('InvitationDisagree',()=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit('InvitationDisagree');
  })
  socket.on('InvitationAgree',()=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    io.sockets.in(room).emit('InvitationAgree');
  })
}

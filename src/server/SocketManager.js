const io = require('./index.js').io;
var parsedUrl = require('url');

let waitingRooms = {};//комнаты,где ожидают второго игрока

module.exports = (socket) => {
  console.log(`Socket ID ${socket.id}`);
  const url = parsedUrl.parse(socket.handshake.headers.referer).query;

  socket.on('start',(room)=>{
    if(url === null) {
      socket.join(room);
      if(!waitingRooms[room])
        waitingRooms[room] = true;
      //else запрос на новый id, тк такая комната есть
      console.log('создана комната ' + room);
      console.log(`человек в комнате ${io.sockets.adapter.rooms[room].length}`)
    }
    else {
       socket.join(url);
       if(io.sockets.adapter.rooms[url].length === 1 || io.sockets.adapter.rooms[url].length > 2) {
         socket.leave(url)
         console.log('sorry,this room is undefined');
       } else {
          console.log('присоединен к комнате '+ url);
          console.log(`человек в комнате ${io.sockets.adapter.rooms[url].length}`);
       }
    }
    for(key in waitingRooms){
      if(io.sockets.adapter.rooms[key].length > 1){
        io.sockets.in(key).emit('ready');
        delete waitingRooms[key];
      }
    }
  })

  socket.on('message',(body)=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit('message',{
      body,
      from: 'Opponent'//socket.id.slice(8)
    });
  })
}

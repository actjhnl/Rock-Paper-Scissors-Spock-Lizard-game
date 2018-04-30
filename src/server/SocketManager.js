const io = require('./index.js').io;
var parsedUrl = require('url');

let connectedRooms = {};

module.exports = (socket) => {
  console.log(`Socket ID ${socket.id}`);
  const url = parsedUrl.parse(socket.handshake.headers.referer).query;
  socket.on('start',(room)=>{
    if(url === null) {
      socket.join(room);
      if(!connectedRooms[room])
        connectedRooms[room] = true;
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
          console.log(`человек в комнате ${io.sockets.adapter.rooms[url].length}`);// потому что после покидания единственного человека из комнаты, массива не будет существовать
       }
    }
    //console.log(Object.keys(connectedRooms))
    for(key in connectedRooms){
      if(io.sockets.adapter.rooms[key].length > 1){
        //socket.broadcast.to(key).emit('message', 'what is going on, party people?');
        io.sockets.in(key).emit('ready');
      }
    }
  })

  socket.on('test',(room)=>{
    io.sockets.in(room).emit('message','SUCCESS');
    console.log('test by');
  })
  //socket.on('startGame',(room)=>{
  //   const url = parsedUrl.parse(socket.handshake.headers.referer).query;
  //   if(url === null)// нету пути
  //   {
  //     //join
  //     socket.join(room.toString());
  //     console.log('создана комната в '+room)
  //   }
  //   else
  //   {
  //     // в комнату
  //     socket.join(url.toString());
  //     console.log('присоединен к комнате '+ url)
  //     if(io.sockets.adapter.rooms[url.toString()].length === 2){
  //       socket.emit('ready');
  //     }
  //   }
  // })


  // console.log('---')
  // const u = parsedUrl.parse(socket.handshake.headers.referer);
  // if(u.query !== null){
  //   console.log('---> connect to new room');
  //   const rm = u.query.toString();
  //
  //   if (io.sockets.adapter.rooms[rm])
  //   {
  //      const before = io.sockets.adapter.rooms[rm].length;
  //      console.log('before '+ before);
  //   }
  //
  //   socket.join(rm);
  //   if (io.sockets.adapter.rooms[rm])
  //   {
  //      const after = io.sockets.adapter.rooms[rm].length;
  //      console.log('after '+ after + ' in ' + rm);
  //   }
  //
  // console.log('---')
  // socket.on('subscribeToTimer', (interval) => {
  //   console.log('client is subscribing to timer with interval ', interval);
  // });
  //
  // socket.on('room', function(room) {
  //     socket.join(room);
  //     console.log('room')
  //     //socket.emit('message', 'what is going on, party people?');
  //     socket.broadcast.to('abc123').emit('message', 'what is going on, party people?');
  //     //socket.broadcast.to('abc123').emit('test',Object.keys(io.sockets.connected).length);
  //     var roomm = io.sockets.adapter.rooms['abc123'].length;
  //     if(roomm === 2) socket.emit('redirect');
  //     console.log('--->>>',roomm)
  // });
}

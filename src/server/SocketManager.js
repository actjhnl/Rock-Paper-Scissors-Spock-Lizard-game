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
    else {
      console.log("The room is undefined. You can start game");
      socket.emit('err');
    }

       // if(io.sockets.adapter.rooms[url].length === 1 || io.sockets.adapter.rooms[url].length > 2) {
       //   socket.leave(url)
       //   console.log('sorry,this room is undefined');
       // } else {

       //}
       //console.log(waitingRooms)
       // if(io.sockets.adapter.rooms[url].length > 1){
       //   io.sockets.in(url).emit('ready');
       //   delete waitingRooms[url];
       // }

    // for(key in waitingRooms){
    //   if(io.sockets.adapter.rooms[key].length > 1){
    //     io.sockets.in(key).emit('ready');
    //     delete waitingRooms[key];
    //   }
    // }
    // working but bad
    // socket.on('start',(room)=>{
    //   console.log(`===================     =======================`)
    //   console.log(waitingRooms)
    //   console.log(`===================     =======================`)
    //   if (waitingRooms[url] && io.sockets.adapter.rooms[url].length === 1){
    //       socket.join(url);
    //       console.log('присоединен к комнате '+ url);
    //       console.log(`человек в комнате ${io.sockets.adapter.rooms[url].length}`);
    //       io.sockets.in(url).emit('ready');
    //       delete waitingRooms[url];
    //   }
    //   else if(url === null || !waitingRooms[url]) {
    //     socket.join(room);
    //     if(!waitingRooms[room])
    //       waitingRooms[room] = true;
    //     console.log('создана комната ' + room);
    //     console.log(`человек в комнате ${io.sockets.adapter.rooms[room].length}`)
    //   }
    //   else {
    //     console.log("The room is undefined. You can start game");
    //     //socket.emit('err',"The room is undefined");
    //   }
    //
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
      //console.log(`человек в покинуой комнате ${io.sockets.adapter.rooms[room].length}`);
      //socket.broadcast.to(room).emit('exit');
  })
}

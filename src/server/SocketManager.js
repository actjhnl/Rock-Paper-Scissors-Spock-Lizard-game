const io = require('./index.js').io;
var parsedUrl = require('url');

let waitingRooms = {};
let gamingRooms = {};

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
         //waitingRooms[url] = socket.id;
         console.log('sorry,this room is undefined');
       } else {
          console.log('присоединен к комнате '+ url);
          console.log(`человек в комнате ${io.sockets.adapter.rooms[url].length}`);// потому что после покидания единственного человека из комнаты, массива не будет существовать
       }
    }
    // console.dir(Object.keys(connectedRooms))
    //console.dir(waitingRooms)
    for(key in waitingRooms){
      if(io.sockets.adapter.rooms[key].length > 1){
        //socket.broadcast.to(key).emit('message', 'what is going on, party people?');
        io.sockets.in(key).emit('ready');
        //gamingRooms[key] = waitingRooms[key];
        delete waitingRooms[key]; // костыль. просто когда я подсоединяю еще пару, то он уже имеющуюся игру)запущенную ранее) тоже проходит в этом цикле, и на них тое отрабатыват событие
      }
    }
  })
  socket.on('message',(body)=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit('message',{
      body,
      from: socket.id.slice(8)
    });
  })

}

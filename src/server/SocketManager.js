const io = require('./index.js').io;
var parsedUrl = require('url');

let waitingRooms = {};//комнаты,где ожидают второго игрока

module.exports = (socket) => {
  console.log(`Socket ID ${socket.id}`);
  const url = parsedUrl.parse(socket.handshake.headers.referer).query;
  // 1
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
  // const ROCK = "Rock",
  //       PAPER = "Paper",
  //       SCISSORS = "Scissors",
  //       LIZARD = "Lizard",
  //       SPOCK = "Spock";
  // //обект типа ключ - жест, значение - массив жесто, которые он бьет
  // const GESTURES = {
  //   ROCK:[SCISSORS,LIZARD],
  //   PAPER:[ROCK,SPOCK],
  //   SCISSORS:[PAPER,LIZARD],
  //   LIZARD:[PAPER,SPOCK],
  //   SPOCK:[ROCK,SCISSORS]
  // }
  //let pair = [];// сюда сохраняю 2 жеста от игроков
  // socket.on('gesture',(data)=>{
  //   pair.push(data);
  //   console.log(`----push ok ${pair.length}`);
  //   console.log(pair)
  //   if(pair.length > 1){
  //
  //     // const arr = GESTURES[pair[0].gesture];// типа искать будем по массивчеку жеста первого ответившего игрока
  //     // arr.includes(pair[1].gesture) ? // ищем жест второго игрока в массиве выграшых жестов первого
  //     //   socket.emit('result',pair[0]) // такой жест найден, значит первый победил
  //     // :
  //     //   socket.emit('result', pair[1]) // такого жеста нет, значит второй победил
  //   }
  //})

}

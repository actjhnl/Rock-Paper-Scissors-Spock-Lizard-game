const io = require('./index.js').io;
var parsedUrl = require('url');
const {
  START_GAME, READY, EXIT,
  RESULT, GESTURE, NEW_MESSAGE,
  PLAY_INVITATION, INVITATION_DISAGREE,
  INVITATION_AGREE, OPPONENT_LEAVE
} = require('../constants')
/**
 * Список комнат ожидания второго игрока
 */
let waitingRooms = {};

module.exports = (socket) => {
  console.log(`-----> connect: Socket ID ${socket.id}`);
  const url = parsedUrl.parse(socket.handshake.headers.referer).query;
  /**
   * Клиент запрашивает соединение
   * Смотрим по URL кто пришел
   */
  socket.on(START_GAME,(room)=>{
    /**
     * Новый пользователь.Создаем комнату. Он ожидает
     */
    if(url === null) {
      socket.join(room);
      if(!waitingRooms[room])
        waitingRooms[room] = true;
    }
    /**
     * Оппонент для ожидающего игрока
     * Пускаем в комнату. Комната удаляется из ожидания
     */
    else if (waitingRooms[url] && io.sockets.adapter.rooms[url].length === 1){
        socket.join(url);
        io.sockets.in(url).emit(READY);
        delete waitingRooms[url];
    }
    /**
     * Комната занята или комнаты по такому URL не найдено
     * Создаем под них новую комнату. Ожидают второго игрока
     */
    else{ //(!waitingRooms[url] || io.sockets.adapter.rooms[url].length > 2){
      socket.join(room);
      if(!waitingRooms[room])
        waitingRooms[room] = true;
    }
    // else {
    //   console.log("!");
    // }
    console.log(`===========   state waitingRoom now   ===============`)
    console.log(waitingRooms)
    console.log(`=====================================================`)

  })
  /**
   * Новое сообщение от одного из игроков.
   * Пересылаем
   */
  socket.on(NEW_MESSAGE,(body)=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit(NEW_MESSAGE,{
      body,
      from: 'Opponent'
    });
  })
  /**
   * Игроком сделан выбор жестта
   */
  socket.on(GESTURE,(gesture)=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit(RESULT,{
      gesture,
      from: socket.id
    });
  })
  /**
   * Игроком была покинута комната
   */
  socket.on(EXIT,()=>{
      let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
      //socket.leave(room);
      socket.disconnect()
      socket.broadcast.to(room).emit(OPPONENT_LEAVE);
  })
  /**
   * Один из игроков приглашает сыграть еще раз
   */
  socket.on(PLAY_INVITATION,()=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit(PLAY_INVITATION);
  })
  /**
   * Игрок не принял приглашение сыграть еще раз
   */
  socket.on(INVITATION_DISAGREE,()=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    socket.broadcast.to(room).emit(INVITATION_DISAGREE);
  })
  /**
   * Игрок принял приглашение сыграть еще раз
   */
  socket.on(INVITATION_AGREE,()=>{
    let room = Object.keys(socket.rooms).filter(item => item!=socket.id);//get current room
    io.sockets.in(room).emit(INVITATION_AGREE);
  })
}

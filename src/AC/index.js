import * as act from '../constants'
export function initSocket(socket){
  return {
    type: act.INIT_SOCKET,
    socket:socket
  }
}

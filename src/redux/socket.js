import socketIO from 'socket.io-client';

const SOCKET_CONNECTION_INIT = 'SOCKET_CONNECTION_INIT'
const SOCKET_CONNECTION_SUCCESS = 'SOCKET_CONNECTION_SUCCESS'
const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR'
const SOCKET_CONNECTION_CLOSE = 'SOCKET_CONNECTION_CLOSED'
const SOCKET_MESSAGE = 'SOCKET_MESSAGE'

const socketConnectionInit = (socket) => ({type: SOCKET_CONNECTION_INIT, socket})
const socketConnectionSuccess = () => ({type: SOCKET_CONNECTION_SUCCESS})
const socketConnectionError = () => ({type: SOCKET_CONNECTION_ERROR})
export const socketConnectionClosed = () => ({type: SOCKET_CONNECTION_CLOSE})
const socketMessage = (data) => ({type: SOCKET_MESSAGE, data})

const initialState = {
  connected: false,
  socket: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SOCKET_CONNECTION_INIT:
      return {...state, connected: false, socket: action.socket}

    case SOCKET_CONNECTION_SUCCESS:
      return {...state, connected: true}

    case SOCKET_CONNECTION_ERROR:
      return {...state, connected: false}

    case SOCKET_CONNECTION_CLOSE:
      return {...state, connected: false, socket: null}

    case SOCKET_MESSAGE:
      return state

    default:
      return state;
  }
}

export function initializeSocket() {
  return (dispatch) => {
    const socket = socketIO('http://localhost:9000', {
      transports: ['websocket'],
      jsonp: false,
      forceNew: true,
    }).connect()

    socket.on('connect', () => dispatch(socketConnectionSuccess()))
    socket.on('error', () => dispatch(socketConnectionError()))
    socket.on('inert', (e) => dispatch(socketMessage(e.data)))
    socket.on('disconnect', () => dispatch(socketConnectionClosed()))

    dispatch(socketConnectionInit(socket));
  }
}

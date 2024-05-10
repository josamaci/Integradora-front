import { io } from 'socket.io-client';

//Para que funcione online comenta esta linea
export const socketURL = process.env.NODE_ENV === 'production' ? '' : 'ws://127.0.0.1:3000/caballos';

//Para que funcione online descomenta esta linea y agrega el link de cloudflare
// export const socketURL = process.env.NODE_ENV === 'production' ? '' : '<cloudflare link>/caballos';

export const socket = io(socketURL, {
  autoConnect: false
});
import { io } from 'socket.io-client';

//Para que funcione online comenta esta linea
// export const socketURL =  'http://localhost:3000/caballos';
export const socketURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/caballos';

//Para que funcione online descomenta esta linea y agrega el link de cloudflare
// export const socketURL = process.env.NODE_ENV === 'production' ? '' : 'https://collect-delivers-tires-learning.trycloudflare.com/caballos';

export const socket = io(socketURL, {
  autoConnect: false
});
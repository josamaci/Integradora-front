import { io } from 'socket.io-client';

// export const socketURL = process.env.NODE_ENV === 'production' ? '' : 'ws://127.0.0.1:3000/caballos';
export const socketURL = process.env.NODE_ENV === 'production' ? '' : 'https://pressure-laos-suppose-lp.trycloudflare.com/caballos';

export const socket = io(socketURL, {
  autoConnect: false
});
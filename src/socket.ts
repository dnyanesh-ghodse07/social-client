// src/socket.js
import { io } from 'socket.io-client';

// http://localhost:5173/
// "https://stoked-keyword-436905-f9.el.r.appspot.com/"
const socket = io("http://localhost:9000/", {
  withCredentials: true,
  transports: ["polling", "websocket"]
});

export default socket;

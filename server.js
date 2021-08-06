import { WebSocketServer } from 'ws';
import { decryptedData, validateData } from './util.js'

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let decryptedMessage = decryptedData(message);
    console.log(validateData(decryptedMessage));
  });

});
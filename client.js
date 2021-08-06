import WebSocket from 'ws';
import { encryptData, getSumCheckMessage } from './util.js';

const ws = new WebSocket('ws://localhost:3000');


ws.on('open', function open() {
  setInterval(function(){    
    ws.send(
      encryptData(JSON.stringify(getSumCheckMessage()))
    );
  }, 10000)

});
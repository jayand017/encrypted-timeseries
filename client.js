import WebSocket from 'ws';
import fs from 'fs';
import crypto from 'crypto';

var data = fs.readFileSync('data.json', 'utf8');
data = JSON.parse(data);

const ws = new WebSocket('ws://localhost:3000');

function getRandomIndex(limit) {
  return Math.floor(Math.random() * limit)
}

function getMessage() {
  
  const totalNames = data.names.length;
  const totalCities = data.cities.length;

  let message = {
    name: data.names[getRandomIndex(totalNames)],
    origin: data.cities[getRandomIndex(totalCities)],
    destination: data.cities[getRandomIndex(totalCities)]
  };

  return message
}

function getHash(message) {
  return crypto.createHash('sha256').update(message).digest('hex');
}

function getSumCheckMessage() {
  let message = getMessage();
  message["secret_key"] = getHash(JSON.stringify(message));
  return message;
}

ws.on('open', function open() {
  /* setInterval(function(){    
    ws.send(
      JSON.stringify(getSumCheckMessage())
    );
  }, 10000) */
  
});

ws.on('message', function incoming(message) {
  console.log('received: %s', message);
});
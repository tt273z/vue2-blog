const WebSocket = require('ws')
const express = require('express');
var http = require('http');
const app = express();
const wsConnectionList = {}

var server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  console.log(req.url)
  let username = req.url.substring(1)
  console.log(username)
  ws.on('message', (message) => {
    console.log('received: ' + message);
    console.log(wsConnectionList)
    console.log(username)
    wsConnectionList[username] = ws
    // wsConnectionList[username].send(JSON.stringify(message))
    ws.send(JSON.stringify(message))
  });
});

server.listen(8000)
server.on('listening', function(){
	console.log('Listening on ' + server.address().port)
})

module.exports = wss
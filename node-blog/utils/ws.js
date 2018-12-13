const Model = require('../mongodb/db');
const WebSocket = require('ws');
const express = require('express');
var http = require('http');
const app = express();
const connectionList = {}

var server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    console.log('received: ' + message);
    console.log(connectionList)
    let data = JSON.parse(message)
    if(data.type == 'login'){
    	//TODO在离线判断 
    	connectionList[data.username] = ws
    } else if (data.type == 'comment') {
    	if(!!connectionList[data.author]) {
    		connectionList[data.author].send(JSON.stringify(data))
    	}
    }
  });
});

server.listen(8000)
server.on('listening', function(){
	console.log('Listening on ' + server.address().port)
})

module.exports = wss
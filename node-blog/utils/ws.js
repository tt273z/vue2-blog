const Model = require('../mongodb/db');
const WebSocket = require('ws');
const express = require('express');
var http = require('http');
const app = express();

const config = require('./config')
const connection = config.connection
var server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    console.log('received: ' + message);
    let data = JSON.parse(message)
    if(data.type == 'login'){
    	connection[data.username] = ws
    	if(config.offlineNotice[data.username] && config.offlineNotice[data.username].length) {
    		connection[data.username].send(JSON.stringify(config.offlineNotice[data.username]))
    	}
    } else if (data.type == 'logout') {
    	delete connection[data.username]
			delete config.offlineNotice[data.username]
    }
  });
});

server.listen(8000)
server.on('listening', function(){
	console.log('Listening on ' + server.address().port)
})

module.exports = wss
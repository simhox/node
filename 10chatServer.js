var express = require('express');
var socket = require("socket.io");

var app = express();

var server = app.listen(26893,function(){
    console.log("Wifi chat server gestartet");
});

var io = socket( server);

io.on('connection',function(socketConn){
    console.log("neuer benutzer ist verbunden..");
    socketConn.on('disconnect',function(){
        console.log("benutzer hat chat verlassen");
    })
});

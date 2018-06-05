var express = require('express');
var socket = require("socket.io");

var app = express();

var server = app.listen(26893,function(){
    console.log("Wifi chat server gestartet");
});

var io = socket( server);
var countUserString = function(){
    return '( '+i+' sind online)';
}

var i =0;

io.on('connection',function(socketConn){

    var user= '';
    console.log("Verbindung erstellt.. Anzahl User:"+i);

    socketConn.on('disconnect',function(){
        if(user!=''){
            i--;
            console.log("benutzer hat chat verlassen  Anzahl User:"+i);
        }
    });

    socketConn.on('neueruser',function( username ){
        i++;
        user = username;
        io.emit("serversagt",username+' ist online');
        console.log("Neuer Benutzer "+username+" erstellt.. Anzahl User:"+    countUserString() );

    })
    socketConn.on('clientmessage',function(message){
        io.emit("messagebroadcast",{username:user,message:message});
    });

});

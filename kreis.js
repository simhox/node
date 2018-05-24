var fs = require('fs');//file system//zugriff aufs dateisystem
var express = require('express');
var bp = require('body-parser');//INhalte aus Request auslesen!!
var fs = require('fs');

var app = express();
var server = app.listen(3008,function(){
console.log('server mit express auf port 3008 gestartet');
});
/*
app.use(function(request,response,next){//use =egal welcher request kommt
    response.setHeader('Access-Control-Allow-Origin','*');//von jeder source//alternativ auf ip adressen einschränken
    response.setHeader('Access-Control-Allow-Methods','OPTIONS,POST');//welche methode
    response.setHeader('Access-Control-Request-Headers','Content-Type');
    next();//bleibt in use hängen sonst

});
*/

app.post('/circle',function(request,response){
    console.log('POST Request an server');
    console.log(request.body);
    response.end( 'Test');

});
app.get('/',function(request,response){
    response.sendFile(__dirname+'/1KreisAPI.html');//__dirname = aktueller ordnername//.. == ein ordner höher?
});
app.get('/j',function(request,response){
    response.sendFile(__dirname+'/jquery-3.3.1.min.js');//__dirname = aktueller ordnername//.. == ein ordner höher?
});

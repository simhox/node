var fs = require('fs');//file system//zugriff aufs dateisystem
var express = require('express');
var bp = require('body-parser');//INhalte aus Request auslesen!!
var fs = require('fs');

var app = express();
var server = app.listen(3000,function(){
console.log('server mit express auf port 3000 gestartet');
});

app.use(function(request,response,next){//use =egal welcher request kommt
    response.setHeader('Access-Control-Allow-Origin','*');//von jeder source//alternativ auf ip adressen einschränken
    response.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET,DELETE');//welche methode
    response.setHeader('Access-Control-Request-Headers','Content-Type');
    response.setHeader('Access-Control-Allow-Headers','*');
    next();//bleibt in use hängen sonst
});

app.use(bp.json());//application-json

var alleOrte=[];
var id = 0;
app.post('/addMarker',function(request,response){
    console.log('POST Request an server');
   //response.setHeader('Content-Type','application/json');
   var marker = request.body;
   request.body.id = id;
   id++;
   console.log(marker);
   alleOrte.push(marker);
   //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(alleOrte));


});
app.post('/removeMarker',function(request,response){
    console.log('POST Request an server');
   //response.setHeader('Content-Type','application/json');
   var marker = request.body;
   request.body.id = id;
   id++;
   console.log(marker);
   alleOrte.push(marker);
   //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(alleOrte));


});

// app.get('/',function(request,response){
//     response.sendFile(__dirname+'/1KreisAPI.html');//__dirname = aktueller ordnername//.. == ein ordner höher?
// });
// app.get('/j',function(request,response){
//     response.sendFile(__dirname+'/jquery-3.3.1.min.js');//__dirname = aktueller ordnername//.. == ein ordner höher?
// });

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
    response.setHeader('Access-Control-Allow-Headers');
    next();//bleibt in use hängen sonst
});
*/
//app.use(bp.urlencoded({extended:false})); // x-www-form-urlencoded
app.use(bp.json());//application-json


app.post('/circle',function(request,response){
    console.log('POST Request an server');
    console.log('Request Body'+request.body);
    var r = request.body.radius;
    var u = 2*r*Math.PI.toFixed(2);
    var f = r*r*Math.PI.toFixed(2);
    console.log('radius'+r);
    var responseData ={
       umfang:u,
       flaeche:f
   };
   //response.setHeader('Content-Type','application/json');
   var thejson = JSON.stringify(responseData);
    //response.end(thejson);


});
app.get('/',function(request,response){
    response.sendFile(__dirname+'/1KreisAPI.html');//__dirname = aktueller ordnername//.. == ein ordner höher?
});
app.get('/j',function(request,response){
    response.sendFile(__dirname+'/jquery-3.3.1.min.js');//__dirname = aktueller ordnername//.. == ein ordner höher?
});

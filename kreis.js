var fs = require('fs');//file system//zugriff aufs dateisystem
var express = require('express');
var bp = require('body-parser');//INhalte aus Request auslesen!!

var app = express();
var server = app.listen(3008,function(){
console.log('server mit express auf port 3008 gestartet');
});

app.use(function(request,response,next){
    response.setHeader('Access-Control-Allow-Origin','*');//von jeder source
    response.setHeader('Access-Control-Allow-Methods','POST');//welche methode

});//use =egal welcher request kommt


app.post('/circle',function(request,response){
console.log('POST Request an server');
console.log(request.body);
response.end( 'Test');

});
app.get('/',function(request,response){
    response.end('nichts vorhanden');
})

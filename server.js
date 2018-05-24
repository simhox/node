var http = require('http');//modul für httprequests
var fs = require('fs');//file system//zugriff aufs dateisystem
var $ = require('jQuery');

http.createServer(function(request,response){

console.log('anfrage wurde an den server geschickt');
console.log(request.url);
if(request.url =="/test.html"){
    fs.readFile('test.html',function(err,inhalt){
        response.end(inhalt);

    });
}else{
    response.writeHead(404);
    response.end("error..");
}

}).listen(12345);
console.log('server ist gestartet');

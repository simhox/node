var fs = require('fs');//file system//zugriff aufs dateisystem
var express = require('express');
var bp = require('body-parser');//INhalte aus Request auslesen!!


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
var highscores =[];
app.use(bp.json());//application-json
app.post('/save',function(request,response){
    console.log('POST Request an server (save)');
    // console.log(request.body);
    // console.log(request.body.id);
   console.log(request.body);
    highscores.push(request.body);
    console.log(highscores);
   //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(highscores));


});

app.post('/speciesSort',function(request,response){
    console.log('POST Request an server (speciesSort)');
    // console.log(request.body);
    // console.log(request.body.id);
    highscores.sort(function(a, b) {
        return b["nmbOfSpecies"] - a["nmbOfSpecies"] || b["highscore"] - a["highscore"];
    });
   //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(highscores));
});

app.post('/highscoreSort',function(request,response){
    console.log('POST Request an server (speciesSort)');
    // console.log(request.body);
    // console.log(request.body.id);
    highscores.sort(function(a, b) {
        return b["highscore"] - a["highscore"] || b["nmbOfSpecies"] - a["nmbOfSpecies"];
    });
   //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(highscores));
});

app.post('/show',function(request,response){
    console.log('POST Request an server (show)');
    response.end(JSON.stringify(highscores));


});

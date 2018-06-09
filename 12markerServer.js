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

var alleOrte;
fs.readFile( '13marker.json', function( err, data ) {
  alleOrte = JSON.parse( data );
} );
var id = 0;

var saveMarkersToFile = function(){

    fs.writeFile( '13marker.json', JSON.stringify( alleOrte ), function() {
        //könnte man noch was machen...
    });

}


app.post('/addMarker',function(request,response){
    console.log('POST Request an server');
   //response.setHeader('Content-Type','application/json');
   var marker = request.body;

   // id++;

   var max=0;
   for(let i =0; i<alleOrte.eintraege.length; i++){
       if(alleOrte.eintraege[i].id > max){
           max = alleOrte.eintraege[i].id;
       }
   }
   marker.id = ++max;
   console.log(alleOrte.eintraege);
   console.log(max);
   console.log(marker);

   alleOrte.eintraege.push(marker);
   saveMarkersToFile();



   //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(alleOrte.eintraege));


});
app.post('/mapLoaded',function(request,response){
    console.log('POST Request an server(Map loaded)');
    response.end(JSON.stringify(alleOrte.eintraege));

});
app.post('/removeMarker',function(request,response){
    console.log('POST Request an server');
   //response.setHeader('Content-Type','application/json');
   var marker = request.body;
   request.body.id = id;
   id++;
   console.log(marker);
   alleOrte.eintraege.push(marker);
   //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(alleOrte.eintraege));


});

// app.get('/',function(request,response){
//     response.sendFile(__dirname+'/1KreisAPI.html');//__dirname = aktueller ordnername//.. == ein ordner höher?
// });
// app.get('/j',function(request,response){
//     response.sendFile(__dirname+'/jquery-3.3.1.min.js');//__dirname = aktueller ordnername//.. == ein ordner höher?
// });

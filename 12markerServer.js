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

app.use(bp.json());//application-json

var alleOrte;
fs.readFile( '13marker.json', function( err, data ) {
  alleOrte = JSON.parse( data );
} );
var id = 0;

var saveMarkersToFile = function(){

    fs.writeFile( '13marker.json', JSON.stringify( alleOrte ), function(err) {
        //könnte man noch was machen...
        if(err) throw err;
    });

}

var readMarkersFromFileIntoAlleOrte = function(){
    fs.readFileSync( '13marker.json',"utf-8", function( err, data ) {
      alleOrte = JSON.parse( data );
      console.log(data);
    } );
}


app.post('/addMarker',function(request,response){
    console.log('POST Request an server');
    readMarkersFromFileIntoAlleOrte();
   var marker = request.body;
   var max=0;
   for(let i =0; i<alleOrte.eintraege.length; i++){
       if(alleOrte.eintraege[i].id > max){
           max = alleOrte.eintraege[i].id;
       }
   }
   marker.id = ++max;
   console.log(alleOrte.eintraege);
   alleOrte.eintraege.push(marker);
   saveMarkersToFile();



   //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(alleOrte.eintraege));


});
app.post('/mapLoaded',function(request,response){
    console.log('POST Request an server(Map loaded)');
    response.end(JSON.stringify(alleOrte.eintraege));

});
app.post('/deleteMarker',function(request,response){
    console.log('POST Request an server (remove Marker)');
    readMarkersFromFileIntoAlleOrte();
    var theid = request.body.id;
    theid = theid*1;
    // console.log(request.body);
    // console.log(theid);

    alleOrte.eintraege = alleOrte.eintraege.filter(x =>x.id !==theid);

    // console.log(alleOrte.eintraege);
    saveMarkersToFile();

   // var marker = request.body;
   // request.body.id = id;
   // id++;
   // console.log(marker);
   // alleOrte.eintraege.push(marker);
   // //var thejson = JSON.stringify(responseData);
    response.end(JSON.stringify(alleOrte.eintraege));


});
app.post('/singleMarker',function(request,response){
    console.log('POST Request an server (singleMarker)');
    var theid = request.body.id;
    theid = theid*1;
    // console.log(request.body);
    // console.log(theid);

    var temparray = alleOrte.eintraege.filter(x =>x.id ===theid);

    console.log(temparray);

    response.end(JSON.stringify(temparray));


});

// app.get('/',function(request,response){
//     response.sendFile(__dirname+'/1KreisAPI.html');//__dirname = aktueller ordnername//.. == ein ordner höher?
// });
// app.get('/j',function(request,response){
//     response.sendFile(__dirname+'/jquery-3.3.1.min.js');//__dirname = aktueller ordnername//.. == ein ordner höher?
// });

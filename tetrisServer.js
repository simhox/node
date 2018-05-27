bp = require("body-parser");
express = require("express");
fs = require('fs');
serve = require("express-static");
cors = require('cors');


app = express();
app.use(serve(__dirname+'/'));//lädt alle files im ordner tetris
app.listen('3001',function(){

    console.log('server started on 3001');
});
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());//application-json
//app.use(cors());

app.use(function(request,response,next){//use =egal welcher request kommt
    response.setHeader('Access-Control-Allow-Origin','*');//von jeder source//alternativ auf ip adressen einschränken
    response.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');//welche methode
    response.setHeader('Access-Control-Request-Headers','Content-Type');
    response.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    next();//bleibt in use hängen sonst
});



app.post('/speichern',function(request,response){
console.log('post speichern called');

    var thejson = {
    something:'test'
    }
    response.end(JSON.stringify(thejson));
});



// app.get('/',function(request,response){
//     // response.sendFile(__dirname+'/tetris/index.html');//__dirname = aktueller ordnername//.. == ein ordner höher?
//     // response.sendFile(__dirname+'/tetris/texture.jpg');
//     // response.sendFile(__dirname+'/stats.js');
//     // console.log(__dirname+'/tetris/stats.js');
// });

// app.get('/j',function(request,response){
//     response.sendFile(__dirname+'/jquery-3.3.1.min.js');
//
// })

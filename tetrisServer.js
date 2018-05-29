bp = require("body-parser");
express = require("express");
fs = require('fs');
serve = require("express-static");
cors = require('cors');


app = express();
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());//application-json
//app.use(cors());

app.use(function(request,response,next){//use =egal welcher request kommt
    response.setHeader('Access-Control-Allow-Origin','*');//von jeder source//alternativ auf ip adressen einschränken
    response.setHeader('Access-Control-Allow-Methods','OPTIONS,POST');//welche methode
    response.setHeader('Access-Control-Request-Headers','Content-Type');
    response.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    next();//bleibt in use hängen sonst
});


var highscoreList =[];
var cnt =1;
app.post('/speichern',function(request,response){
    console.log('post speichern called');
    // console.log(request.body);
    var obj = request.body;
    obj.id = cnt++;
    highscoreList.push(obj);
    console.log(highscoreList);
        response.end('success');
});

app.get('/highscore',function(request,response){
    console.log("get highscore called");
    var nmbOfEntries = request.param('amount');

    console.log(nmbOfEntries);
    if(nmbOfEntries==0){
        //get all entries
        response.end(JSON.stringify(highscoreList));
        console.log('nmbOfEntries = 0');
    }else{
        //get nmbOfEntries
        console.log('nmbOfEntries = '+nmbOfEntries);

        var temparr = [];
        var obj = {};
        for(var i =0; i<nmbOfEntries;i++){
            obj[i]=highscoreList[i];
        }
        console.log('obj:'+JSON.stringify(obj));

        response.end(JSON.stringify(obj));
    }

    //response.end(JSON.stringify(highscoreList));
});

app.delete('/delete',function(request,response){
    console.log("delete request called");
    //delete id
    //get id
    var id = request.param('id');
    console.log('id: '+id);
    var newArray = highscoreList.filter(function(obj){
        return highscoreList.indexOf(obj.id) ===-1;
    });
    console.log('newARR'+newArray);
    response.end("success");

});

app.use(serve(__dirname+'/tetris'));//lädt alle files im ordner tetris
app.listen('3001',function(){

    console.log('server started on 3001');
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

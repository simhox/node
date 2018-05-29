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
    response.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET,DELETE');//welche methode
    response.setHeader('Access-Control-Request-Headers','Content-Type');
    response.setHeader('Access-Control-Allow-Headers','*');
    next();//bleibt in use hängen sonst
});

// var highscore;
// fs.readFile('highscore.json',function(err,data){
// highscore =JSON.parse(data);
//
// });

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
        sortHighscoreList();
    }else{
        //get nmbOfEntries
        console.log('nmbOfEntries = '+nmbOfEntries);

        sortHighscoreList();
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
    //console.log('id: '+id);
     highscoreList = highscoreList.filter(function(obj){
        return obj.id != id;
    });
    console.log('highscoreList');
    console.log( highscoreList);

    response.end("success");

});

app.post('/filter',function(req,res){
  console.log('post filter called');
  var filteramount = req.body.filteramount;
  console.log(filteramount);
  var tempList = highscoreList.filter(function(obj){
     return obj.highscore > filteramount;
 });


  res.end(JSON.stringify(tempList));
});

app.post('/editname',function(req,res){
  console.log('post editname called');
  var id = req.body.id;
  var name = req.body.name;
  console.log(id +' '+ name );

  function changeName( id, name ) {
     for (var i in highscoreList) {
       if (highscoreList[i].id == id) {
          highscoreList[i].name = name;
          break; //Stop this loop, we found it!
       }
     }
  }
  changeName(id,name);

  res.end(JSON.stringify(highscoreList));
});

var sortHighscoreList = function(){
  console.log("sortHighscoreList called");
  function compare(a,b) {
  if (a.highscore < b.highscore)
    return 1;
  if (a.highscore > b.highscore)
    return -1;
  return 0;
}

 highscoreList= highscoreList.sort(compare);
 console.log('sortedHighscoreList= ');
 console.log( highscoreList);
}
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

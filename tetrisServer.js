bp = require("body-parser");
express = require("express");
fs = require('fs');
app = express();

app.listen('3000',function(){

    console.log('server started on 3000');
});

app.get('/',function(request,response){
    response.sendFile(__dirname+'/tetris/index.html');//__dirname = aktueller ordnername//.. == ein ordner höher?
    response.sendFile(__dirname+'/tetris/texture.jpg');
    response.sendFile(__dirname+'/tetris/stats.js');

});

app.get('/j',function(request,response){
    response.sendFile(__dirname+'/jquery-3.3.1.min.js');

})

bp = require("body-parser");
express = require("express");
fs = require('fs');
app = express();

app.listen('3000',function(){

    console.log('server started on 3000');
});


app.get('/j',function(request,response){
    response.sendFile(__dirname+'jquery-3.3.1.min.js');

})

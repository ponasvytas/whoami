var path = require("path")
var express = require("express");
var app = express();
var locale = require("locale");
var requestIP = require("request-ip");


const os = require("os");

var port = process.env.PORT || 8080

app.use(requestIP.mw())
app.use (locale())


app.get('/', function(req, res) {
  var fileName = path.join(__dirname, '/index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});



app.get("/data", function (req, res){
    
    
    var ip = req.clientIp;
    var language = req.headers["accept-language"].substr(0,5);
    var opSys = os.type();
    var osRelease = os.release();
    
    
    var obj = {
      IP_address:ip,
      language: language,
      System: opSys + " " + osRelease+"; "+os.platform() + "; " + os.arch()
  }
    
    res.send(JSON.stringify(obj));
});












app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
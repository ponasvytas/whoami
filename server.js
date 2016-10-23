var express = require("express");
var app = express();
var locale = require("locale");
var requestIP = require("request-ip");
const os = require("os");

var port = process.env.PORT || 8080

app.use(requestIP.mw())
app.use (locale())

app.get("/", function (req, res){
    
    
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
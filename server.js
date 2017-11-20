// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/*", function (req, res){
    var forwardedIpsStr = req.get('x-forwarded-for');
    if (forwardedIpsStr) {
      reponse.ipaddress = forwardedIpsStr.split(',')[0];  
    }
    var language = req.get('accept-language');
    var indice = language.length;  
    console.log(language);
    if (language) {
      for (var i = 0, len = language.length; i < len; i++) {
        if (language[i] == ',') {
          indice = i;
          break;
        }
      }
      reponse.language = language.substring(0, indice);
    }
    var software = req.get('user-agent');
    if (software) {
      var indice_deb = 0;
      var indice_fin = software.length;
      for (var i = 0, len = software.length; i < len; i++) {
        if (software[i] == '(') {
          indice_deb = i+1;
        }
        else if (software[i] == ')') {
          indice_fin = i;
        }
      }
      reponse.software = software.substring(indice_deb, indice_fin);
    }
    res.send(reponse);
});

var reponse = {
  "ipaddress": null,
  "language": null,
  "software": null
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

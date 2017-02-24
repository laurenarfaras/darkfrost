var express = require("express");
var server = express();
var port = process.env.PORT || 8080;
var axios = require("axios");
var apiKey = require("./secrets").darkskyAPIKey;

server.get("/weather/:lat,:lon", function(request, response) {
  var url = `https://api.darksky.net/forecast/${apiKey}/${request.params.lat},${request.params.lon}`;
  axios.get(url)
      .then(function(res){ // success
        return res.data;
      })
      .then(function(data){
        response.send(data);
      })
      .catch(function(error){ // failure
        console.log(error);
      });
});

server.listen(port, function(){
  console.log("now listening on port ", port);
});

var express = require("express");
var server = express();
var port = process.env.PORT || 8080;
var axios = require("axios");
var darkskyAPIKey = require("./secrets").darkskyAPIKey;
var geocodeAPIKey = require("./secrets").geocodeAPIKey;

server.use(express.static(__dirname + '/public'));

server.get("/", function(request, response){
  response.sendFile('index.html', {root: __dirname + '/public/html'});
})

server.get("/weather/:lat,:lon", function(request, response) {
  var url = `https://api.darksky.net/forecast/${darkskyAPIKey}/${request.params.lat},${request.params.lon}`;
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

server.get("/location/:address", function(request, response){
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.params.address}&key=${geocodeAPIKey}`;
  axios.get(url)
      .then(function(res){
        return res.data;
      })
      .then(function(data){
        response.send(data);
      })
      .catch(function(error){
        console.log(error);
      });
});

server.listen(port, function(){
  console.log("now listening on port ", port);
});

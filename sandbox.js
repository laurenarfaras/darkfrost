var axios = require("axios");
var apiKey = require("./secrets").darkskyAPIKey;
console.log(apiKey);
var url = `https://api.darksky.net/forecast/${apiKey}/37.8267,-122.4233`;
// var sample = require("./sampleModule");
// console.log(sample);
// sample.a();

// cheese.a();

axios.get(url)
    .then(function(response){ // success
      return response.data;
    })
    .then(function(data){
      console.log(data);
    })
    .catch(function(error){ // failure
      console.log(error);
    });

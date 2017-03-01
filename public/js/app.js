var currentlyWidget = new Vue({
  el: "#currently",
  data: {
    location: "Gainesville, FL",
    apparentTemperature: 72,
    summary: "Partly Cloudy",
    icon: "partly-cloudy",
    precipProbability: 0.15,
    humidity: 0.71,
    time: 1000000
  },
  created: function(){
    axios.get('/weather/29.1,-89.4')
        .then(function(response){
          currentlyWidget.apparentTemperature = response.data.currently.apparentTemperature;
          currentlyWidget.summary = response.data.currently.summary;
          currentlyWidget.icon = response.data.currently.icon;
          currentlyWidget.precipProbability = response.data.currently.precipProbability;
          currentlyWidget.humidity = response.data.currently.humidity;
          currentlyWidget.time = response.data.currently.time;
          console.log(response.data);
        })
        .catch(function(error){
          console.log(error);
        });
  }
});

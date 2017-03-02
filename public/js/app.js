var currentlyWidget = new Vue({
  el: "#currently",
  data: {
    location: "Gainesville, FL",
    apparentTemperature: 72,
    summary: "Partly Cloudy",
    icon: "partly-cloudy",
    precipProbability: 0.15,
    humidity: 0.71,
    time: 1000000,
    latitude: 29.1,
    longitude: -81.4
  },
  methods: {
    iconName: function(iconString){
      return `wi wi-forecast-io-${iconString}`;
    },
    updateWeather: function(){
      var url = `/weather/${this.latitude},${this.longitude}`;
      axios.get(url)
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
  },
  created: function(){
    axios.get('/weather/29.1,-81.4')
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

var dailyWidget = new Vue({
  el: "#daily",
  data: {
    summary: "",
    icon: "rain"
  },
  methods: {
    iconName: function(iconString){
      return `wi wi-forecast-io-${iconString}`;
    }
  },
  created: function(){
    axios.get("/weather/29.1, -89.4")
        .then(function(response){
          dailyWidget.summary = response.data.daily.summary;
          dailyWidget.icon = response.data.daily.icon;
        })
        .catch(function(error){
          console.log(error);
        });
  }
});

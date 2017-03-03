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
    getWeather: function(lat, lon) {
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
    },
    updateWeather: function(){
      this.getWeather(this.latitude, this.longitude);
    }
  },
  created: function(){
    this.getWeather(29.1, -81.4);
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

var hourlyWidget = new Vue({
  el: "#hourly",
  data: {
    summary: "it's gonna rain!",
    icon: "cloudy",
    apparentTemperature: 79,
    time: 10000000
  },
  methods: {
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var month = date.getMonth();
      var year = date.getFullYear();
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return `${month + 1}/${day}/${year} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
    },
    iconName: function(iconString){
      return `wi wi-forecast-io-${iconString}`;
    },
    getHourlyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
          .then(function(response){
            var hourlyData = response.data.hourly;
            this.summary = hourlyData.summary;
            this.icon = hourlyData.icon;
            this.hours = hourlyData.data;
          }.bind(this))
          .catch(function(err){
            console.log(err);
          });
    }
  },
  created: function(){
    this.getHourlyWeather(29.1, -84.1);
  }
});

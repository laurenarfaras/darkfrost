var currentlyWidget = new Vue({
  el: "#currently",
  data: {
    city: "Gainesville",
    state: "FL",
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
    getCoordinates: function(city, state){
      var address = `${city},${state}`;
      var url = `/location/${address}`;
      axios.get(url)
          .then(function(response){
            this.latitude = response.data.results[0].geometry.location.lat;
            this.longitude = response.data.results[0].geometry.location.lng;
            // console.log(response.data.results[0].geometry.location.lat);
            this.getWeather(this.latitude, this.longitude);
          }.bind(this))
          .catch(function(error){
            console.log(error);
          });
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
      this.getCoordinates(this.city, this.state);
      // this.getWeather(this.latitude, this.longitude);
    }
  },
  created: function(){
    this.getCoordinates("Gainesville", "FL");
  }
});

var dailyWidget = new Vue({
  el: "#daily",
  data: {
    summary: "",
    icon: "rain",
    time: 10000000,
    days: []
  },
  methods: {
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      // var month = date.getMonth();
      // var year = date.getFullYear();
      // var day = date.getDate();
      var dayOfWeek = date.getDay();
      if (dayOfWeek === 0){
        dayOfWeek = "Sun";
      } else if (dayOfWeek === 1) {
        dayOfWeek = "Mon";
      } else if (dayOfWeek === 2) {
        dayOfWeek = "Tue";
      } else if (dayOfWeek === 3) {
        dayOfWeek = "Wed";
      } else if (dayOfWeek === 4) {
        dayOfWeek = "Thu";
      } else if (dayOfWeek === 5) {
        dayOfWeek = "Fri";
      } else if (dayOfWeek === 6) {
        dayOfWeek = "Sat";
      }
      return `${dayOfWeek}`;
    },
    getDailyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
          .then(function(response){
            var dailyData = response.data.daily;
            this.summary = dailyData.summary;
            this.icon = dailyData.icon;
            this.days = dailyData.data;
          }.bind(this))
          .catch(function(err){
            console.log(err);
          });
    }
  },
  created: function(){
    this.getDailyWeather(29.1, -89.4);
  }
});

var hourlyWidget = new Vue({
  el: "#hourly",
  data: {
    summary: "it's gonna rain!",
    icon: "cloudy",
    apparentTemperature: 79,
    time: 10000000,
    hours: []
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
    getHourlyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
          .then(function(response){
            var hourlyData = response.data.hourly;
            this.summary = hourlyData.summary;
            this.icon = hourlyData.icon;
            this.hours = hourlyData.data;
            this.apparentTemperature = hourlyData.apparentTemperature;
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

var minutelyWidget = new Vue({
  el: "#minutely",
  data: {
    summary: "it's gonna rain!",
    icon: "cloudy",
    apparentTemperature: 79,
    time: 10000000,
    precipProbability: 1,
    precipIntensity: 2,
    minutes: []
  },
  methods: {
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var month = date.getMonth();
      var year = date.getFullYear();
      var day = date.getDate();
      var dayOfWeek = date.getDay();
      if (dayOfWeek === 0){
        dayOfWeek = "Sun";
      } else if (dayOfWeek === 1) {
        dayOfWeek = "Mon";
      } else if (dayOfWeek === 2) {
        dayOfWeek = "Tue";
      } else if (dayOfWeek === 3) {
        dayOfWeek = "Wed";
      } else if (dayOfWeek === 4) {
        dayOfWeek = "Thu";
      } else if (dayOfWeek === 5) {
        dayOfWeek = "Fri";
      } else if (dayOfWeek === 6) {
        dayOfWeek = "Sat";
      }
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return `${dayOfWeek}, ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
    },
    getMinutelyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
          .then(function(response){
            var minutelyData = response.data.minutely;
            this.summary = minutelyData.summary;
            this.icon = minutelyData.icon;
            this.minutes = minutelyData.data;
            this.apparentTemperature = minutelyData.data.apparentTemperature;
          }.bind(this))
          .catch(function(err){
            console.log(err);
          });
    }
  },
  created: function(){
    this.getMinutelyWeather(29.1, -84.1);
  }
});

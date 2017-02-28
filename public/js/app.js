var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue",
  }
});

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
  }
});

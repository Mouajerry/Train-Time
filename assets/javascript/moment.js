  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBsVZwuNGhS4c8lewvSu5J926COjM4QJCA",
    authDomain: "train-time-fd0ca.firebaseapp.com",
    databaseURL: "https://train-time-fd0ca.firebaseio.com",
    projectId: "train-time-fd0ca",
    storageBucket: "train-time-fd0ca.appspot.com",
    messagingSenderId: "704873354332"
  };

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var startTime = "";
var frequency = 0;

function currentTime() {
  var current = moment().format('LTS');
  $("#currentTime").html(current);
  setTimeout(currentTime, 1000);
};

currentTime();


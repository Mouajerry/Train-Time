$(document).ready(function() {

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
  
  function currentTime() {
   var current = moment().format('LTS');
   $("#currentTime").html(current);
   setTimeout(currentTime, 1000);
  }
  
  $("#addTrainBtn").on("click", function(event) {
   event.preventDefault();
  
   var trainName = $("#trainName").val().trim();
   var trainDestination = $("#trainDestination").val().trim();
   var trainTime = $("#trainTime").val().trim();
   var trainFrequency =$("#trainFrequency").val().trim();
  
   var newTrain = {
     name: trainName,
     destination: trainDestination,
     time: trainTime,
     frequency: trainFrequency,
     dataAdded: firebase.database.ServerValue.TIMESTAMP
   };
  
   database.ref().push(newTrain);
  
   console.log(newTrain.name);
   console.log(newTrain.destination);
   console.log(newTrain.time);
   console.log(newTrain.frequency);
  
   $("#trainName").val("");
   $("#trainDestination").val("");
   $("#trainTime").val("");
   $("#trainFrequency").val("");
  
  });
  
  database.ref().on("child_added", function(childSnapshot) {
  
   var trainName = childSnapshot.val().name;
   var trainDestination = childSnapshot.val().destination;
   var trainTime = childSnapshot.val().time;
   var trainFrequency = childSnapshot.val().frequency;
   var key = childSnapshot.key;
  
   console.log(trainName);
   console.log(trainDestination);
   console.log(trainTime);
   console.log(trainFrequency);
  
   var currentTime = moment();
   console.log("Current time: " + moment(currentTime).format("hh:mm"));
  
   var convertedTime = moment(trainTime, "HH:mm").subtract(1, "years");
   console.log(convertedTime);
  
   var diffTime = moment().diff(moment(convertedTime), "minutes");
   console.log("Difference in Time: " + diffTime);
  
   var timeRemainder = diffTime % trainFrequency;
   console.log(timeRemainder);
  
   var minutesAway = trainFrequency - timeRemainder;
   console.log("Minutes Away: " + minutesAway);
  
   var nextArrival = moment().add(minutesAway, "minutes");
   console.log("Next Arrival: " + moment(nextArrival).format("hh:mm"));
  
   var newRow = $("<tr>").append(
     $("<td class='text-center'>").text(trainName),
     $("<td class='text-center'>").text(trainDestination),
     $("<td class='text-center'>").text(trainFrequency),
     $("<td class='text-center'>").text(moment(nextArrival).format("hh:mm A")),
     $("<td class='text-center'>").text(minutesAway),
     $("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key ='" + key + "'>X</button></td>'")
   );
  
   $("#scheduleTable > tbody").append(newRow);
  
  });
  
  $(document).on("click", ".arrival", function(){
   keyref = $(this).attr("data-key");
   database.ref().child(keyref).remove();
   window.location.reload();
  });
  
  currentTime();
  
  setInterval(function() {
   window.location.reload();
  }, 60000);
  
  });
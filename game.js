var config = {
  apiKey: "AIzaSyBpEg8q3HheVFieqpeSSELgxTPnwaRCzak",
  authDomain: "azza-cda40.firebaseapp.com",
  databaseURL: "https://azza-cda40.firebaseio.com",
  projectId: "azza-cda40",
  storageBucket: "azza-cda40.appspot.com",
  messagingSenderId: "1041140311422"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function (event) {
  event.preventDefault();


  var tName = $("#train-name-input").val().trim();
  var tDest = $("#dest-input").val().trim();
  var tStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
  var tFreq = $("#freq-input").val().trim();


  var newT = {
    name: tName,
    destination: tDest,
    start: tStart,
    frequentcy: tFreq
  };


  database.ref().push(newT);





  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");
});


database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());


  var tName = childSnapshot.val().name;
  var tDest = childSnapshot.val().destination;
  var tStart = childSnapshot.val().start;
  var tFreq = childSnapshot.val().frequentcy;







  var firstTimeConverted = moment(tStart, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);


  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));


  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);


  var tRemainder = diffTime % tFreq;
  console.log(tRemainder);


  var tMinutesTillTrain = tFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));




  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDest),
    $("<td>").text(tFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain, ("minutes")),


  );


  $("#train-table > tbody").append(newRow);

});

setInterval(function () {
  location.reload()
}, 60000)
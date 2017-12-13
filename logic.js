  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCdPjuC2Ig3yoG9EYxKeuEdyp6Hw1DDCF0",
      authDomain: "train-time-a6f3b.firebaseapp.com",
      databaseURL: "https://train-time-a6f3b.firebaseio.com",
      projectId: "train-time-a6f3b",
      storageBucket: "train-time-a6f3b.appspot.com",
      messagingSenderId: "1042194730041"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    // var dataRef = firebase.database();
    var database = firebase.database();

    // Initial Values
    var name = "";
    var dest = "";
    var next = "";
    var freq = "";
    var nextTrain = "";
    var minutesAway = "";
    var firstTimeConverted = "";
    var currentTime = "";
    var diffTime = "";
    var tRemainder = "";
    var minutesTilTrain = "";
    var keyHolder = "";
    var getKey = "";


  $(document).ready(function() {
    // Moment.js variables to be used for timing of Trains and Minutes Away
    // Capture Button Click
    $("#add-train").on("click", function() {
       console.log(this);
      // Don't refresh the page!
      // event.preventDefault();
      // Code in the logic for storing and retrieving the most recent user.
      name = $("#name-input").val().trim();
      dest = $("#dest-input").val().trim();
      next = $("#next-input").val().trim();
      freq = $("#freq-input").val().trim();
         firstTimeConverted = moment(firstTrainTime, "hh.mm").subtract(1, "years");
         currentTime = moment();
         diffTime = moment().diff(moment(firstTimeConverted), "minutes");
         tRemainder = diffTime % frequency;
         minutesTilTrain = frequency - tRemainder;
         nextTrain = moment().add(minutesTilTrain, "minutes");
         nextTrainFormatted = moment(nextTrain).format("hh.mm");


      // set to .set instead of .push to test
      keyHolder = database.ref().push({
        name: name,
        dest: dest,
        next: next,
        freq: freq,
         nextTrainFormatted: nextTrainFormatted,
         minutesTilTrain: minutesTilTrain
      });

      $("#name-input").val("");
      $("#dest-input").val("");
      $("#next-input").val("");
      $("#freq-input").val("");

    return false;

    });


    // Firebase watcher + initial loader HINT: .on("child-added")
  database.ref().on('child_added', function(snapshot){  
  // dataRef.on("child_added",function(childSnapshot) {

 // Uncaught SyntaxError: missing ) after argument list line 74
      $("#train-schedule").append("<tr class=\"table-row\" id=" + " " + childSnapshot.keyHolder() + " " + ">" +  
          "<td class=\"col-xs-3\">" + childSnapshot.val().name +
          "</td>" +
          "<td class=\"col-xs-2\">" + childSnapshot.val().dest +
          "</td>" +
          "<td class=\"col-xs-2\">" + childSnapshot.val().freq +
          "</td>" +
          "<td class=\"col-xs-2\">" + childSnapshot.val().nextTrainFormatted +
          "</td>" +
          "<td class=\"col-xs-2\">" + childSnapshot.val().minutesTilTrain +
          "</td>" +
          "<td class=\"col-xs-1\">" + "<input type=\"submit\" value=\"remove train\" class=\"remove-train btn btn-primary btn-sm\">" + "</td>" +
          "</tr>");  
    
      // Handle the errors
  }, function(errorObject) {
         // console.log("Errors handled: " + errorObject.code);
  });

  $("body").on("click", ".remove-train", function() {
  $(this).closest("tr").remove();
  getKey = $(this).parent().parent().attr("id");
  database.ref().child(getKey).remove();
  });
  
  });



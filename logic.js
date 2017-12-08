// (document).ready(function(){

// Initialize Firebase
    var config = {
      apiKey: "AIzaSyCdPjuC2Ig3yoG9EYxKeuEdyp6Hw1DDCF0",
      authDomain: "train-time-a6f3b.firebaseapp.com",
      databaseURL: "https://train-time-a6f3b.firebaseio.com",
      projectId: "train-time-a6f3b",
      storageBucket: "",
      messagingSenderId: "1042194730041"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var name = "";
    var dest = "";
    var next = 0;
    var freq = 0;

    // Moment.js variables to be used for timing of Trains and Minutes Away
    // var randomDate = "02/23/1999";
    // var randomFormat = "MM/DD/YYYY";
    // var convertedDate = moment(randomDate, randomFormat);

    // Capture Button Click
    $("#addUser").on("click", function() {
      // Don't refresh the page!
      // event.preventDefault();
      // Code in the logic for storing and retrieving the most recent user.
      name = $("#nameInput").val().trim();
      dest = $("#destInput").val().trim();
      next = $("#nextInput").val().trim();
      freq = $("#freqInput").val().trim();

      database.ref().push({
        name: name,
        dest: dest,
        next: next,
        freq: freq
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added",function(snapshot) {

      // Change the HTML to reflect.  Not sure if html or append or prepend here.
      $("#nameDisplay").html(snapshot.val().name);
      $("#destDisplay").html(snapshot.val().dest);
      $("#nextDisplay").html(snapshot.val().next);
      $("#freqDisplay").html(snapshot.val().freq);

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().dest);
      console.log(snapshot.val().next);
      console.log(snapshot.val().freq);

      // Add trains to list () Not sure if html or append or prepend here.
      $("#full-member-list").append("<tr><td ='name'> " + snapshot.val().name 
        + " </tr><td ='dest'> " + snapshot.val().dest
        + " </tr><td ='next'> " + snapshot.val().next 
        + " </tr><td ='freq'> " + snapshot.val().freq + " </tr>");


      // Handle the errors
    }, function(errorObject) {
         console.log("Errors handled: " + errorObject.code);
       });
  



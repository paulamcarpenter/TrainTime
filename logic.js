// (document).ready(function(){

// Initialize Firebase
    var config = {
      apiKey: "AIzaSyBOm4gAAOfNNTvUydkkyw4Eu-mw-vBnDfY",
      authDomain: "project1-55512.firebaseapp.com",
      databaseURL: "https://project1-55512.firebaseio.com",
      projectId: "project1-55512",
      storageBucket: "project1-55512.appspot.com",
      messagingSenderId: "708182834951"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var nameTrain = "";
    var destTrain = "";
    // var firstTrain = 0;
    // var freqTrain = 0;

    // Moment.js variables to be used for timing of Trains and Minutes Away
    // var randomDate = "02/23/1999";
    // var randomFormat = "MM/DD/YYYY";
    // var convertedDate = moment(randomDate, randomFormat);

    // Capture Button Click
    $("#add-user").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      nameTrain = $("#nameTrain-input").val();
      destTrain = $("#destTrain-input").val();
      firstTrain = $("#firstTrain-input").val();
      freqTrain = $("#freqTrain-input").val();

      database.ref().push({
        nameTrain: nameTrain,
        destTrain: destTrain,
        firstTrain: firstTrain,
        freqTrain: freqTrain
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(snapshot) {

      // Change the HTML to reflect
      $("#nameTrain-display").append(snapshot.val().nameTrain);
      $("#destTrain-display").append(snapshot.val().destTrain);
      $("#firstTrain-display").append(snapshot.val().firstTrain);
      $("#freqTrain-display").append(snapshot.val().freqTrain);

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().nameTrain);
      console.log(snapshot.val().destTrain);
      console.log(snapshot.val().firstTrain);
      console.log(snapshot.val().freqTrain);

      // Add trains to list
      $("#full-member-list").append("<tr><td ='nameTrain'> " + snapshot.val().nameTrain 
        + " </tr><td ='destTrain'> " + snapshot.val().destTrain 
        + " </tr><td ='firstTrain'> " + snapshot.val().firstTrain 
        + " </tr><td ='freqTrain'> " + snapshot.val().freqTrain + " </tr>");


      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
  



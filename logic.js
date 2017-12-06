// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
    apiKey: "AIzaSyBOm4gAAOfNNTvUydkkyw4Eu-mw-vBnDfY",
    authDomain: "project1-55512.firebaseapp.com",
    databaseURL: "https://project1-55512.firebaseio.com",
    projectId: "project1-55512",
    storageBucket: "project1-55512.appspot.com",
    messagingSenderId: "708182834951"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
//var database = ...
var database = firebase.database();


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    highPrice = $("#highPrice-input").val().trim();
    highBidder = $("#highBidder-input").val().trim();


    // Change the HTML to reflect the stored values
      $("#highPrice-display").text(snapshot.val().highPrice);
      $("#highBidder-display").text(snapshot.val().highBidder);
     

    // Print the data to the console.
        console.log(highPrice);
        console.log(highBidder);


  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
      $("#highPrice-display").text(snapshot.val().highPrice);
      $("#highBidder-display").text(snapshot.val().highBidder);

    // Print the data to the console.
        console.log(highPrice);
        console.log(highBidder);

  }


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values


  // Log the Bidder and Price (Even if not the highest)
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
      database.ref().set


    // Log the new High Price
    console.log(snapshot);


    // Store the new high price and bidder name as a local variable
    var highBidder = "";
    var highPrice = "";


    // Change the HTML to reflect the new high price and bidder

    $("#highBidder-display").text(snapshot.val().highBidder);
    $("#highPrice-display").text(snapshot.val().highPrice);

    }


  else {
    // Alert
    // alert("Sorry that bid is too low. Try again.");
  }

});

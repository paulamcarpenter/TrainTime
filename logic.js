
    var config = {
      apiKey: "AIzaSyCdPjuC2Ig3yoG9EYxKeuEdyp6Hw1DDCF0",
      authDomain: "train-time-a6f3b.firebaseapp.com",
      databaseURL: "https://train-time-a6f3b.firebaseio.com",
      projectId: "train-time-a6f3b",
      storageBucket: "train-time-a6f3b.appspot.com",
      messagingSenderId: "1042194730041"
    };
    firebase.initializeApp(config);

    var trainData = firebase.database();

    // Capture Button Click
    $("#addTrainBtn").on("click", function() {
      // Code in the logic for storing and retrieving the most recent user.
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      }

      trainData.ref().push(newTrain);

      alert("Train Added!");

      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");

      return false;
    })

    // Firebase watcher + initial loader HINT: .on("child-added")
      trainData.ref().on('child_added', function(snapshot){  
          var name = snapshot.val().name;
          var destination = snapshot.val().destination;
          var frequency = snapshot.val().frequency;
          var firstTrain = snapshot.val().firstTrain;

          var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
          var minutes = frequency - remainder;
          var arrival = moment().add(minutes, "m").format("hh:mm A");

          console.log(remainder);
          console.log(minutes);
          console.log(arrival);

          $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
      })

    // unable to get train schedule to print out tried using this:
    // $("#train-schedule").text(snapshot.val().name);

      // Handle the errors
 
  



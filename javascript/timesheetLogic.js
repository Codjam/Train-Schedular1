

/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAhGZCVzNDmaNnLSt7pI6q1aDOIOYCrRPU",
  authDomain: "train-station-74f9b.firebaseapp.com",
  databaseURL: "https://train-station-74f9b.firebaseio.com",
  projectId: "train-station-74f9b",
  storageBucket: "",
  messagingSenderId: "286726149152"
};
firebase.initializeApp(config);
console.log(firebase);

var database = firebase.database();



// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#employee-name-input").val().trim();
  var trnRole = $("#role-input").val().trim();
  var trnStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var trnRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data/format read in Firebase****
  var newEmp = {
    name: trnName,
    role: trnRole,
    start: trnStart,
    rate: trnRate
  };

  // Uploads employee data to the database/creates a string
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding trai to the database and a row in the html when a user adds an entry
// callback frunction and adding the previouse child
// everytime a child is added to an arry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnRole = childSnapshot.val().role;
  var trnStart = childSnapshot.val().start;
  var trnRate = childSnapshot.val().rate;

  // Employee Info
  console.log(trnName);
  console.log(trnRole);
  console.log(trnStart);
  console.log(trnRate);

  // Prettify the employee start
  var trnStartPretty = moment.unix(trnStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked/moment grabes todays date.
  var trnMonths = moment().diff(moment.unix(trnStart, "X"), "months");
  console.log(trnMonths);

  // Calculate the total billed rate
  var trnBilled = trnMonths * trnRate;
  console.log(trnBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnRole + "</td><td>" +
  trnStartPretty + "</td><td>" + trnMonths + "</td><td>" + trnRate + "</td><td>" + trnBilled + "</td></tr>");
});

// create code in moment.js to confirm that any attempt we use mets this test case

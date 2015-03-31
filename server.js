var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// config
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(__dirname + '/public'))

var courses = [ 

	{ name : "Java 101", category : "PROG", dateCreated : "1/1/2015", description : "Wow" },
  	{ name : "MongoDB 101", category : "DB", dateCreated : "2/1/2015", description : "Good" },
  	{ name : "Express 101", category : "PROG", dateCreated : "3/1/2015", description : "Better" },
  	{ name : "AngularJS 101", category : "WEB", dateCreated : "4/1/2015", description : "Best" },
  	{ name : "NodeJS 101", category : "PROG", dateCreated : "5/1/2015", description : "Awesome" } 

  	];

// ROUTES

app.get('/api/course', function (req, res) {
  res.json(courses);
});

app.get('/api/course/:index', function (req, res) {
  // returns course found at the index
  var index = req.params.index;
  res.json(courses[index]);
});

app.post('/api/course', function (req, res) {
  // adds course object and returns all courses
  var newCourse = {
  	name : req.body.name,
  	category : req.body.category,
  	dateCreated : req.body.dateCreated,
  	description : req.body.description
  };
  courses.push(newCourse);
  res.json(courses);
});

app.delete('/api/course/:index', function (req, res) {
  // removes course at index and returns all remaining courses
  //$scope.courses.splice(index, 1);
  var index = req.params.index;
  courses.splice(index, 1);
  res.json(courses);
});

app.put('/api/course/:index', function (req, res) {
  // updates course at index and returns all courses
  var index = req.params.index;

  var updatedCourse = {
  	name : req.body.name,
  	category : req.body.category,
  	dateCreated : req.body.dateCreated,
  	description : req.body.description
  };

  courses[index] = updatedCourse;

  res.json(courses);

  //$scope.courses[$scope.courseIndex] = updatedCourse;
});

// listen
app.listen(8080);
console.log("App listening on port " + 8080);

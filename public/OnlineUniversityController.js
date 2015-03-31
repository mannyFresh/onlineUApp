var onlineUApp = angular.module('onlineUApp', ['ui.bootstrap']);

onlineUApp.factory('CourseService', function($http) {
  var findAll = function(callback) 
  {
    $http.get('/api/course')
      .success(callback); 
  }

  var createCourse = function(newCourse, callback) {

      //$scope.courses.push(newCourse);

      $http.post('/api/course', newCourse)
      .success(callback);

      // CourseService.create ????

  }

  var updateCourse = function(courseIndex, updatedCourse, callback) 
  {
    $http.put('/api/course/' + courseIndex, updatedCourse)
      .success(callback);
  }

  var remove = function(index, callback)
  {

      $http.delete('/api/course/' + index)
      .success(callback);
  }

  return {
    findAll: findAll,
    create: createCourse,
    update: updateCourse,
    remove: remove
  };
});

onlineUApp.controller('OnlineUniversityController', function ($http, $scope, $filter, CourseService) {

/*
	$scope.courses = [ 

	{ name : "Java 101", category : "PROG", dateCreated : "1/1/2015", description : "Wow" },
  	{ name : "MongoDB 101", category : "DB", dateCreated : "2/1/2015", description : "Good" },
  	{ name : "Express 101", category : "PROG", dateCreated : "3/1/2015", description : "Better" },
  	{ name : "AngularJS 101", category : "WEB", dateCreated : "4/1/2015", description : "Best" },
  	{ name : "NodeJS 101", category : "PROG", dateCreated : "5/1/2015", description : "Awesome" } 

  	];
*/
    CourseService.findAll(function(courses) {
        $scope.courses = courses;
      });

  	$scope.todaysDate = $filter("date")(Date.now(), 'M/dd/yyyy');

  	$scope.createCourse = function(newCourse) {

  		newCourse.dateCreated = $scope.todaysDate;

  		//$scope.courses.push(newCourse);

      CourseService.create(newCourse, function(courses) {
        $scope.courses =  courses;
        toastr.success('Course Successfully Added');
      });

      // CourseService.create ????

  		$scope.newCourse = null;
  	}

  	$scope.updateCourse = function(updatedCourse) {
  		//$scope.courses[$scope.courseIndex] = updatedCourse;

      CourseService.update($scope.courseIndex, updatedCourse, function(courses) {
        $scope.courses = courses;
        toastr.success('Course Successfully Updated');
        $scope.courseIndex = null;
      });

      // CourseService.update ????
  	}

  	$scope.remove = function(course) {
  		var index = $scope.courses.indexOf(course);

      CourseService.remove(index, function(courses) {

        $scope.courses = courses;

        toastr.success('Course Successfully Deleted');
      });

  		//$scope.courses.splice(index, 1);

      // CourseService.remove ????
  	}

  	$scope.fillEditCourseForm = function(course) {

  		$scope.courseIndex = $scope.courses.indexOf(course);

  		$scope.updatedCourse = {
  			name: course.name,
  			category : course.category,
  			dateCreated : $scope.todaysDate,
  			description : course.description
  		};
  	}
});

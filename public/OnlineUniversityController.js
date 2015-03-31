var onlineUApp = angular.module('onlineUApp', ['ui.bootstrap']);

onlineUApp.factory('CourseService', function($http) {
  var findAll = function(callback) 
  {
    $http.get('/api/course')
      .success(callback); 
  }

  var createCourse = function(newCourse, callback) {

      $http.post('/api/course', newCourse)
      .success(callback);

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

    CourseService.findAll(function(courses) {
        $scope.courses = courses;
      });

  	$scope.todaysDate = $filter("date")(Date.now(), 'M/dd/yyyy');

  	$scope.createCourse = function(newCourse) {

  		newCourse.dateCreated = $scope.todaysDate;

      CourseService.create(newCourse, function(courses) {
        $scope.courses =  courses;
        toastr.success('Course Successfully Added');
      });

  		$scope.newCourse = null;
  	}

  	$scope.updateCourse = function(updatedCourse) {

      CourseService.update($scope.courseIndex, updatedCourse, function(courses) {
        $scope.courses = courses;
        toastr.success('Course Successfully Updated');
        $scope.courseIndex = null;
      });
  	}

  	$scope.remove = function(course) {
  		var index = $scope.courses.indexOf(course);

      CourseService.remove(index, function(courses) {

        $scope.courses = courses;

        toastr.success('Course Successfully Deleted');
      });
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

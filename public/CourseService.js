angular.module('CourseService', []).factory('Course', ['$http', function($http) {
	return {
		// call to get all courses
		get : function() {
			return $http.get('/api/course');
		},

		// call to get a single course
		get : function(index) {
			return $http.get('/api/couse/:index';)
		},

		// call to post and create a new course and return all courses
		create : function(courseData) {
			return $http.post('/api/course', courseData);
		},

		// call to delete course at index and return remaining courses
		remove : function(index) {
			return $http.delete('/api/course/:index');
		},

		// call to update object at index and return all courses
		put : function(courseData, index) {
			return $http.update('/api/course/:index', courseData);
		}
	}
}]);
var App = angular.module('myApp',[]);
// Sometime it's needed, but not at all.
App.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});

App.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
	var self = this;
	self.message = '';

	self.send = function(){
		UserService.send().then(
			function(d){
				self.message = d;
			},
			function(e){
				self.message = e;
			}
		);
	};
	 
}]);

'use strict';

App.factory('UserService', ['$http', '$q', function($http, $q){

	return {
		send: function() {
			return $http.post('http://localhost:5234/send')
				.then(
					function(response){
						return response.data;
					}, 
					function(errResponse){
						console.error('Error while fetching users');
						return $q.reject(errResponse);
					}
				);
		}
	};

}]);

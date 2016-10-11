angular.module('casabombillo')

	.controller('defaultController', ['$http', '$scope', '$rootScope', 'authService',
	 function ($http, $scope, $rootScope, authService) {

		var controller = this;


		/*this.getProducts = function(){
			$http.get('http://localhost/getProducts').then(function(response){
				controller.productos = response.data;

			}).catch(function(error){
				console.log(error);
			});
		};*/

		this.viewProduct = function(producto) {
			console.log(1);
			$rootScope.activeProduct = producto;
			location.href = "/#/viewProduct";
		};


	
}])
angular.module('casabombillo')

	.controller('mainController', ['$http', '$scope', '$rootScope', 'authService',
	 function ($http, $scope, $rootScope, authService) {

		var controller = this;
		$rootScope.productos = [];
		$rootScope.categorias = [];
		$rootScope.activeProduct = {};
		$rootScope.activeCategoria = {};
		this.user = {};

		this.setCategoria = function(cat){
			$rootScope.activeCategoria = cat;
		}

		this.getProducts = function(){
			$http.get('http://localhost/getProducts').then(function(response){
				$rootScope.productos = response.data;

			}).catch(function(error){
				console.log(error);
			});
		};

		this.getCategories = function(){
			$http.get('http://localhost/getCategories').then(function(response){
				$rootScope.categorias = response.data;

			}).catch(function(error){
				console.log(error);
			});
		};

		this.getProducts();
		this.getCategories();

		this.login = function(){
			authService.login();

		};

		this.logout = function(){
			authService.logout();

		};

		this.showProfile = function(){
			location.href = '#/perfil';
		};

		controller.user = authService.userProfile;
		


		$rootScope.$on('userProfileSet', function(data){
			 console.log(data);
			controller.user = JSON.parse(localStorage.getItem('profile')) || {};
		}); 

	
}])
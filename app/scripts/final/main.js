angular.module('casabombillo', ['ngCart']);
angular.module('casabombillo')
	.directive('navBar', function  () {
		return {
			restrict: 'E',
			templateUrl: 'views/nav.html'

		};
		
	})
	.directive('products', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/products.html'
		};

	});
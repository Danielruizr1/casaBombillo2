angular.module('casabombillo', ['ngCart', 'ui.router',
	'auth0.lock', 'angular-jwt', 'ngSanitize', 'ezplus'])
	.config(function($stateProvider, $urlRouterProvider, $interpolateProvider,  
		lockProvider, jwtOptionsProvider, jwtInterceptorProvider, $httpProvider) {
 
	  $urlRouterProvider.otherwise("/defaultt");
	  $interpolateProvider.startSymbol('{[');
	  $interpolateProvider.endSymbol(']}');

	  lockProvider.init({
        clientID: 'OhgmXRdIZ5KaJah0hQsFa5AEYrjbsx85',
        domain: 'ruizoft.auth0.com',
        options: {
        	language: 'es',
        	auth: {
        		 redirect: false,
        	}
        }
      });

      jwtOptionsProvider.config({
      	whiteListedDomains: ['localhost'],
        tokenGetter: function() {
          return localStorage.getItem('id_token');
        }
      });

      $httpProvider.interceptors.push('jwtInterceptor');



	  $stateProvider
	    .state('defaultt', {
	      url: "/defaultt",
	      templateUrl: "templates/default.html",
	      controller: 'defaultController as controller'
	    })
	    .state('viewProduct', {
	      url: "/viewProduct",
	      templateUrl: "templates/viewProduct.html",
	       controller: 'viewProductController as controller'
	    })
	    .state('perfil', {
	      url: "/perfil",
	      templateUrl: "templates/perfil.html",
	       controller: 'perfilController as controller'
	    })
	    .state('pedidos', {
	      url: "/pedidos",
	      templateUrl: "templates/pedidos.html",
	       controller: 'pedidosController as controller'
	    })
	    .state('cart', {
	      url: "/cart",
	      templateUrl: "templates/cart.html",
	       controller: 'cartController as controller'
	    })
	    .state('coti', {
	      url: "/coti",
	      templateUrl: "templates/coti.html",
	       controller: 'cotiController as controller'
	    })
	})  
	.run(function($rootScope, authService, authManager) {
		authManager.checkAuthOnRefresh();


	  $rootScope.authService = authService;
      authService.registerAuthenticationListener();

      

      
    });
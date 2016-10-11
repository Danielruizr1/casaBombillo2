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
angular.module('casabombillo')
	.directive('navBar', function  () {
		return {
			restrict: 'E',
			templateUrl: 'templates/nav.html'

		};
		
	})
	.directive('product', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/product.html',
			scope: {
				product: "=",
				viewProduct: '=',

			},
		};

	})
	.directive("rzInput",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rzinput.html",
                scope: {
                    type: "@",
                    float: "@",
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    form: "@",
                    ngRequired: "@",
                    ngModel: "=",
                    list: "@",
                    addOn: "@",
                    addName: "@",
                    addFunc: "="
                },
              }
    })
    .directive("rzSearch",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rzsearch.html",
                scope: {
                    type: "@",
                    float: "@",
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    form: "@",
                    ngRequired: "@",
                    ngModel: "=",
                    list: "@",
                    search: "=",
                    addName: "@",
                    clickfunc: "="
                },
                controller: function($scope){
                    $scope.add = function (item){
                        console.log(item);
                        $scope.clickfunc(item);

                    };

                },
              }
    })
 .directive("rzTextarea",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rztextarea.html",
                scope: {
                    maxlength: "@",
                    rows: '@',
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    ngRequired: "@",
                    ngModel: "=",
                },
              }
    })
 .directive("rzSelect",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rzselect.html",
                scope: {
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    ngRequired: "@",
                    options: "=",
                    ngModel: "=",
                    filterr: "=",
                    
                },
              }
    });

angular.module('casabombillo')
.factory('dataBase',  function dataBaseFactory () {
    
    return idb.open('casaBombillo', 1, function(upgradeDb){
      var productos = upgradeDb.createObjectStore("productos", { keyPath: "id"});
      var categorias = upgradeDb.createObjectStore("categorias", { keyPath: "id"});
      var pedidos = upgradeDb.createObjectStore("pedidos", { keyPath: "id"});

    });
    //idb.delete('casaBombillo').then(() => console.log('done!'));
  })
    .service('authService', ['$rootScope', 'lock', 'authManager', 
      function authService($rootScope, lock, authManager) { 

  

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        console.log("auth");
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);
        });
      });
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }]);

    

angular.module('casabombillo')

	.controller('cartController', ['$http', '$scope', '$rootScope', 'authService','ngCart','dataBase',
	 function ($http, $scope, $rootScope, authService, ngCart, dataBase) {
	 	var controller = this;
	 	this.items = [];
	 	this.items = ngCart.getItems();
	 	this.order = {};
	 	console.log(controller.items);

	 	this.comprar = function(){
	 		controller.items.forEach(function(product){
	 			if(!controller.order.productos) {
	 				controller.order.productos = product._name;
	 			} else {
	 				controller.order.productos = controller.order.productos+", "+product._name;
	 			}
	 			if(!controller.order.precio) {
	 				controller.order.precio = product._price;
	 			} else {
	 				controller.order.precio = controller.order.precio+product._price;
	 			}
	 			
	 		});
	 		controller.order.fecha = new Date();
	 		controller.order.estado = 'Pendiente';
	 		controller.order.id = Math.round(Math.random()*1000);
	 		dataBase.then(function(db){
	 			var pedidoObj = db.transaction('pedidos', 'readwrite')
		 			.objectStore('pedidos');

		 			pedidoObj.add(controller.order).then(function(){
		 				controller.order = {};
		 				ngCart.empty();
		 				location.href="/#/pedidos"
		 			});
	 		});


	 	};


	}]);

angular.module('casabombillo')

	.controller('cotiController', ['$http', '$scope', '$rootScope',
	 function ($http, $scope, $rootScope) {

		var controller = this;

		this.items = [];
		this.total = 0;


		this.addItem = function(item){
			if (!controller.items.includes(item)){
				item.cantidad = 0;
				controller.items.push(item);
				controller.total += item.precio * item.cantidad;
				controller.query = '';
			};

		};

		this.newCantidad = function(item){
			if(!item.hasOwnProperty('lastCantidad')) item.lastCantidad = 0;
			if(!item.hasOwnProperty('lastPrice')) item.lastPrice = 0;
			if(item.cantidad > 0 && item.cantidad > item.lastCantidad){
				console.log(item.cantidad);
				console.log(item.precio * item.cantidad);
				item.lastPrice = item.precio * item.cantidad;
				item.lastCantidad = item.cantidad;
				controller.total += (item.precio * item.cantidad);
				console.log(controller.total);
			} else  {
				controller.total -= item.lastPrice;
				item.lastPrice = item.cantidad * item.precio;
				item.lastCantidad = item.cantidad;

			};
		};


		this.downloadPDF = function(){
			var pdf = createPDF(controller.items, controller.total);
			pdf.save('casabombillo-cotizacion'+'.pdf');
		};

		this.sendPDF = function(){
			var pdf = createPDF(controller.items, controller.total);
			var pdfOutput = pdf.output();
			var columns = ["Nombre","Precio","Cantidad"];
			$http.post('http://localhost/sendMail', 
				{
					pdf:pdfOutput,
					email: controller.email,
					data:{
						 items:controller.items,
						 total:controller.total,
						 columns: columns
						}
					
				}

			 ).then(function(response){
				console.log('message sent');

			}).catch(function(error){
				console.log(error);
			});
		};


		
	
}]);



function createPDF(data,total){
	var pdf = new jsPDF('p', 'pt');

	var columns = [
	    {title: "Nombre", dataKey: "nombre"},
	    {title: "Precio", dataKey: "precio"}, 
	    {title: "Cantidad", dataKey: "cantidad"}, 
	];
	console.log(pdf);

	pdf.autoTable(columns, data, {
    margin: {top: 70},
    beforePageContent: function(data) {
        pdf.text("Casa Del Bombillo", 220, 30);
        pdf.text("Cotización", 240, 50);
    },
    afterPageContent: function(tData) {
    	pdf.setFontType("bold");
    	pdf.text("Total: "+total, 50,tData.table.height + 90 );

    },
});

	return pdf;

};
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
angular.module('casabombillo')

	.controller('pedidosController', ['$http', '$scope', '$rootScope', 'authService','dataBase',
	 function ($http, $scope, $rootScope, authService, dataBase) {
	 	var controller = this;

	 	this.pedidos = [
		 	{id:1, productos: 'Bombillo, Cable, Baño', precio: 50000, 
		 	fecha: new Date(), estado: 'Enviado'},
		 	{id:2, productos: 'Nevera, Cable, Baño', precio: 100000, 
		 	fecha: new Date(), estado: 'Enviado'},
		 	{id:3, productos: 'Tubos, Cable, Baño', precio: 20000, 
		 	fecha: new Date(), estado: 'Enviado'},
		 	{id:4, productos: 'Tacos, Cable, Cocina', precio: 80000, 
		 	fecha: new Date(), estado: 'Enviado'},

	 	];

	 	this.getPedidosDB = function(){
	 		dataBase.then(function(db){
	 			var pedidosObj = db.transaction('pedidos')
			 			.objectStore('pedidos');

			 		pedidosObj.getAll().then(function(pedidos){
			 			if(pedidos.length == 0) return;
			 			controller.pedidos = controller.pedidos.concat(pedidos);
			 			$scope.$apply();
			 		})

	 		});

	 	};

	 	this.getPedidosDB();


	}]);

angular.module('casabombillo')

	.controller('perfilController', ['$http', '$scope', '$rootScope', 'authService',
	 function ($http, $scope, $rootScope, authService) {


	}]);

angular.module('casabombillo')

	.controller('viewProductController', ['$http', '$scope', '$rootScope','$sce',
	 function ($http, $scope, $rootScope,$sce) {

		var controller = this;

		this.product = $rootScope.activeProduct;

		this.activeImg;
	

		this.arrangeProduct = function(){
			if(Object.keys(controller.product) == 0) {location.href = '/#/defaultt'; return;}

			
			if(typeof controller.product.galery === 'string'){
				controller.product.galery = controller.product.galery.split(',');
				controller.product.galery.pop();
			}
			if(typeof controller.product.tags === 'string'){
				controller.product.tags = controller.product.tags.split(',');
				controller.product.tags.pop();
			}

			controller.activeImg = controller.product.image;

		};

		this.setImg = function(image){
			controller.product.galery.push(controller.activeImg);
			controller.activeImg = image;
			var index = controller.product.galery.indexOf(image);
			controller.product.galery.splice(index, 1);

		};

		this.arrangeProduct();
	
}])
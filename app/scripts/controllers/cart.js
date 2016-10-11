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

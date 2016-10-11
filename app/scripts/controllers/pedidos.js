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

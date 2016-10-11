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
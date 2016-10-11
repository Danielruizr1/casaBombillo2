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

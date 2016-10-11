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
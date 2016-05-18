// javascript/leninesController.js
angular.module('leninesApp',[])
.controller('leninesController', function($scope,$http,$window) {
	
	var latitude	= -35.717680;
	var longitude	= -9.644430;
	
	var geoOptions 	= { enableHighAccuracy: true,
	                       timeout: 30000,
	                       maximumAge: 3000
                         };
    
    function geoError( err ) {
	   switch( err.code ) {
           case 1:
			 // permissao negada pelo usuario
            break;

		  case 2:
            // nao foi possivel alcancar os satelites GPS
            break;

		  case 3:
			// a requisicao demorou demais para retornar
            break;

		  case 0:
			// ocorreu um erro desconhecido...
			break;
	       }	
    };
    
    function geoSuccess(pos){
                latitude  = pos.coords.latitude;
                longitude = pos.coords.longitude;
            };
	
    $scope.enviar = function(){
        
        $scope.envio.location = {lat: latitude, lng: longitude};
        
		console.log($scope.envio);
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
        
        $http.post('/vonki/emailparasorteio',$scope.envio).success(function(retorno)
        {
            if(retorno){   
                        console.log(retorno);
                        }
            else {
                        console.log(retorno);
                 }
        });
    };
        
    var init = function(){
        
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);

        $scope.envio = {email:'',
                       location: {lat: latitude, lng: longitude}};
    };
    
    init();	
	
});
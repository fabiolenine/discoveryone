// javascript/leninesController.js
angular.module('leninesApp',[])
.controller('leninesController', function($scope,$http,$window) {
	
	var latitude	= -35.717680;
	var longitude	= -9.644430;
	var situacaoGPS = 'permissão concedida';
	
	var geoOptions 	= { enableHighAccuracy: true,
	                       timeout: 30000,
	                       maximumAge: 3000
                         };
    
    function geoError( err ) {
	   switch( err.code ) {
          case 1:
			// permissao negada pelo usuario
			situacaoGPS = 'permissão negada pelo usuário';  
            break;

		  case 2:
            // nao foi possivel alcancar os satelites GPS
			situacaoGPS = 'não foi possivel alcancar os satelites GPS';   
            break;

		  case 3: 
			// a requisicao demorou demais para retornar
			situacaoGPS = 'requisição demorou demais para retornar';   
            break;

		  case 0:
			// ocorreu um erro desconhecido...
			situacaoGPS = 'ocorreu um erro desconhecido';   
			break;
	       }	
    };
    
    function geoSuccess(pos){
                latitude  = pos.coords.latitude;
                longitude = pos.coords.longitude;
            };
	
    $scope.enviar = function(){
        
        $scope.envio.location = {lat: latitude, lng: longitude};
		
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
	
	$scope.enviarcontato = function(){
        
        $scope.enviocontato.location = {lat: latitude, lng: longitude};
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
        
        $http.post('/contato/email',$scope.enviocontato).success(function(retorno)
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

        $scope.envio = {email: 		'',
                       location: 	{lat: latitude, lng: longitude},
					   situacao: 	situacaoGPS};
		
		$scope.enviocontato = {	nome:  		'',
								email: 		'',
							    mensagem: 	'',
                       			location: 	{lat: latitude, lng: longitude},
					   			situacao: 	situacaoGPS};
    };
    
    init();	
	
});
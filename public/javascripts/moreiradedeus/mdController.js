// javascript/leninesController.js
angular.module('mdApp',[])
.controller('mdController', function($scope,$http,$window) {
	
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
		
	$scope.enviarcontato = function(){
        
        $scope.enviocontato.location = {lat: latitude, lng: longitude};
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
        
        $http.post('/contato/email',$scope.enviocontato).success(function(retorno)
        {
            if(retorno){ 
						$scope.msg = {	show: 		true,
										retorno: 	'Obrigado por compartilhar o seu pensamento, retornaremos em breve.'};
                        }
            else {
						$scope.msg = {	show: 		true,
										retorno: 	'Houve algum problema, peço desculpa, mas tente mais tarde.'};
                 }
        });
    };
      
	
	$scope.zerar = function(){
		$scope.enviocontato = {	nome:  		'',
								email: 		'',
							    assunto:	'',
							    mensagem: 	'',
                       			location: 	{lat: latitude, lng: longitude},
					   			situacao: 	situacaoGPS};
		
		$scope.msg	= {	show: 		false,
						retorno: 	''};
	};
	
    var init = function(){
        
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		$scope.zerar();
    };
    
    init();	
	
});
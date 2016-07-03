angular.module("mdMain",["formatTel"])
.controller('mdControllerContato', function($scope,$http,$window) {
		
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
										retorno: 	'Houve algum problema, peÃ§o desculpa, mas tente mais tarde.'};
                 }
        });
    };
	
	$scope.zerar = function(){
		$scope.enviocontato = {	nome:  		'',
								email: 		'',
							    telefone:	'',
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
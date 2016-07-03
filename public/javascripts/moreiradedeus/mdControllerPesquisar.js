angular.module('mdPesquisar',["formatCpf"])
.controller('mdControllerPesquisa', function($scope,$http,$window) {
		        
	$scope.enviarpesquisa = function(){
		
		$scope.enviopesquisa.location = {lat: latitude, lng: longitude};
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		$http.get('/pesquisar/cpf',$scope.enviopesquisa).success(function(retorno)
        {
            if(retorno){ 
						console.log(retorno);
                        }
            else {
						$scope.msg = {	show: 		true,
										retorno: 	'Nome não disponivel on-line, por favor, vá pessoalmente o cartório'};
                 }
        });
		
	};
      
	
	$scope.zerarCPF = function(){

		$scope.enviopesquisa = { cpf:		'',
								 location: 	{lat: latitude, lng: longitude},
					   			 situacao: 	situacaoGPS};
		
	};
	
    var initCpf = function(){
        
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		$scope.zerarCPF();
    };
    
    initCpf();	
	
});
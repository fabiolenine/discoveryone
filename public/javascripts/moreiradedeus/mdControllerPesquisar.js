angular.module('mdPesquisar',["formatCpf","formatCnpj"])
.controller('mdControllerPesquisa', function($scope,$http,$window) {
	
	$scope.enviarpesquisa = function(value){
		
		$scope.enviopesquisa.location = {lat: latitude, lng: longitude};
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		if(value==='CPF') {
			var regex = /\d/;
			
			console.log(regex.test($scope.data));
			
			$http.get('/pesquisar/cpf',$scope.enviopesquisa).success(function(retorno)
			{
				if(retorno){ 
							console.log(retorno);
							}
				else {
							$scope.msg = {	show: 		true,
											retorno: 	'Informação não encontrada.'};
					 }
			});
		} else if(value==='CNPJ'){
			$http.get('/pesquisar/cnpj',$scope.enviopesquisa).success(function(retorno)
			{
				if(retorno){ 
							console.log(retorno);
							}
				else {
							$scope.msg = {	show: 		true,
											retorno: 	'Informação não encontrada.'};
					 }
			});			
		} else if(value==='Nome'){
			$http.get('/pesquisar/nome',$scope.enviopesquisa).success(function(retorno)
			{
				if(retorno){ 
							console.log(retorno);
							}
				else {
							$scope.msg = {	show: 		true,
											retorno: 	'Informação não encontrada.'};
					 }
			});			
		};
		
	};
	
	$scope.zerarData = function(){

		$scope.enviopesquisa = { data:		'',
								 location: 	{lat: latitude, lng: longitude},
					   			 situacao: 	situacaoGPS};

	};
	
    var initFind = function(){
        
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		$scope.zerarData();
    };
    
    initFind();	
	
});
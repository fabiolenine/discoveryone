angular.module('mdPesquisar',["formatCpf","formatCnpj"])
.controller('mdControllerPesquisa', function($scope,$http,$window) {
	
	$scope.enviarpesquisa = function(value){
		
		$scope.enviopesquisa.location = {lat: latitude, lng: longitude};
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		if(value==='CPF') {
			
			var repFinal = $scope.enviopesquisa.data.replace(/\D/g,'');
			
			$scope.enviopesquisa.data = repFinal;
			
			console.log($scope.enviopesquisa);
			
			$http.get('/pesquisar/cpf',$scope.enviopesquisa).success(function(retorno)
			{
				if(retorno){ 
							console.log(retorno);
							}
				else {
							$scope.msg = {	show: 		true,
											retorno: 	'Informação não encontrada.'};
							console.log($scope.msg);
					 }
			});
			
		} else if(value==='CNPJ'){
			
			var repFinal = $scope.enviopesquisa.data.replace(/\D/g,'');
			
			$scope.enviopesquisa.data = repFinal;
			
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
			
			var repFinal = $scope.enviopesquisa.data.replace(/[0-9]/g,'');
			
			$scope.enviopesquisa.data = repFinal;
			
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
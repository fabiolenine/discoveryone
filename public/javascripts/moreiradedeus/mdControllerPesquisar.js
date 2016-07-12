angular.module('mdPesquisar',["formatCpf","formatCnpj"])
.controller('mdControllerPesquisa', function($scope,$http,$window) {
	
	$scope.enviarpesquisa = function(value){
		
		$scope.enviopesquisa.location = {lat: latitude, lng: longitude};
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		if(value==='CPF') {
			
			var repFinal = $scope.enviopesquisa.data.replace(/\D/g,'');
			
			$scope.enviopesquisa.data = repFinal;
			
			console.log($scope.enviopesquisa);
			
			$http({	url: '/pesquisar/cpf',
        			method: "GET",
        			params: { 	data	: $scope.enviopesquisa.data,
								situacao: $scope.enviopesquisa.situacao,
							 	lat		: $scope.enviopesquisa.location.lat,
							 	lng		: $scope.enviopesquisa.location.lng
							}
    			}).then(function mySucces(retorno) {
        					console.log(retorno);
    			}, function myError(response) {
        				console.log(retorno);
    			});
			
		} else if(value==='CNPJ'){
			
			var repFinal = $scope.enviopesquisa.data.replace(/\D/g,'');
			
			$scope.enviopesquisa.data = repFinal;
			
			$http.post('/pesquisar/cnpj',$scope.enviopesquisa).success(function(retorno)
			{
				if(retorno){ 
							console.log(retorno);
							}
				else {
							$scope.msg = {	show: 		true,
											retorno};
					 }
			});			
		} else if(value==='Nome'){
			
			var repFinal = $scope.enviopesquisa.data.replace(/[0-9]/g,'');
			
			$scope.enviopesquisa.data = repFinal;
			
			$http.post('/pesquisar/nome',$scope.enviopesquisa).success(function(retorno)
			{
				if(retorno){ 
							console.log(retorno);
							}
				else {
							$scope.msg = {	show: 		true,
											retorno};
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
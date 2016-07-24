'use strict'

angular.module('mdPesquisar',["formatCpf","formatCnpj","formatNome"])
.controller('mdControllerPesquisa', function($scope,$http,$window) {
	
	$scope.enviarpesquisa = function(value) {
		
		$scope.enviopesquisa.location = {lat: latitude, lng: longitude};
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		if($scope.enviopesquisa.data.trim()!=''){
			if(value==='CPF') {

				var repFinal = $scope.enviopesquisa.data.replace(/\D/g,'');

				$scope.enviopesquisa.data = repFinal;

				console.log($scope.enviopesquisa);

				restFind('/pesquisar/cpf', $scope.enviopesquisa.data, $scope.enviopesquisa.situacao, $scope.enviopesquisa.location.lat, $scope.enviopesquisa.location.lng);

			} else if(value==='CNPJ'){

				var repFinal = $scope.enviopesquisa.data.replace(/\D/g,'');

				$scope.enviopesquisa.data = repFinal;

				restFind('/pesquisar/cnpj', $scope.enviopesquisa.data, $scope.enviopesquisa.situacao, $scope.enviopesquisa.location.lat, $scope.enviopesquisa.location.lng);

			} else if(value==='Nome'){

				var repFinal = $scope.enviopesquisa.data.replace(/[0-9]/g,'');

				$scope.enviopesquisa.data = repFinal;

				restFind('/pesquisar/nome', $scope.enviopesquisa.data, $scope.enviopesquisa.situacao, $scope.enviopesquisa.location.lat, $scope.enviopesquisa.location.lng);

			};
			$scope.zerarData();	
		};
		
	};
	
	$scope.zerarData = function() { $scope.enviopesquisa = {data:		'',
															location: 	{lat: latitude, lng: longitude},
					   			 							situacao: 	situacaoGPS};
								  };
	
	$scope.zerarRetorno = function() { $scope.dadosretorno = {	nome			: '',
															    datanascimento	: '',
							  									datacadastro	: '',
							  									atosregistrado	: [],
							  									cpf				: ''};
									 };
	
	$scope.zerarEscolha = function() {
		$scope.zerarData();
		$scope.zerarRetorno();
		$scope.esconder 	= true;
		$scope.dadosretorno = {};
	};
	
    var initFind = function() { 
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		$scope.zerarEscolha();
    };
	
	var restFind = function(Url, data, situacao, lat, lng) {
    	$http({	url: Url,
        		method: "GET",
        		params: {data, situacao, lat, lng}
    			}).then(function mySucces(retorno) {
        					console.log(retorno);
							$scope.zerarData();
							$scope.esconder 	= false;
							$scope.dadosretorno = retorno.data;
    			}, function myError(retorno) {
        				console.log(retorno);
    			});
	};
						
	initFind();	
	
});
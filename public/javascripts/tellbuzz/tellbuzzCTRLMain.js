angular.module("tellbuzzCTRLMain",[])
.controller('tellbuzzControllerMain', function($scope,$http,$window,$interval,$timeout) {
	var synth = window.speechSynthesis;

	var voices = [];
	
	var socket = io.connect('162.222.177.65:3000');
	
	socket.on('news', function (dados) {
		console.log(dados);
		$scope.zerarRetorno();
		$scope.dadosretorno = dados;
	});
	
	$scope.zerarRetorno = function() { $scope.dadosretorno = {	title		: '',
    															description	: '',
    															link		: '',
    															pubdate		: '',
    															src			: '',
    															language	: ''};
									 };
	

	var restFind = function(Url) {
    	$http({	url: Url,
        		method: "GET",
        		params: {}
    			}).then(function mySucces(retorno) {
        					console.log(retorno);
							$scope.zerarRetorno();
							$scope.dadosretorno = retorno.data;
    			}, function myError(retorno) {
        				console.log(retorno);
    			});
	};
	
    var initFind = function() { 
		$scope.zerarRetorno();
		restFind('http://tellbuzz.lenines.info/api/v001/news');
    };
						
	initFind();
	
	$scope.voice = function(seq) {
		
		var texto = 'Título: ' + $scope.dadosretorno[seq].title + ', agora vou ler a chamada: ' + $scope.dadosretorno[seq].description + ', fim da notícia.';

		var voices = synth.getVoices();
		
		voices = voices.filter(function (voz) { return voz.lang == $scope.dadosretorno[seq].language });
		
		var utterThis = new SpeechSynthesisUtterance(texto);
		utterThis.volume	= 1; // o default é o valor 1, ou seja o volume máximo.
		utterThis.pitch 	= 1; // o default é o valor 1.
		utterThis.rate 		= 1; // o default é o valor 1.
		utterThis.lang		= $scope.dadosretorno[seq].language;
		utterThis.voice		= voices[0];
		
		synth.speak(utterThis);
	};

});
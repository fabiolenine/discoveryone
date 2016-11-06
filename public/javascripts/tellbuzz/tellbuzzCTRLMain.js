angular.module("tellbuzzCTRLMain",[])
.controller('tellbuzzControllerMain', function($scope,$http,$window,$interval,$timeout) {
		
	var socket = io.connect('http://162.222.177.65');
	
	socket.on('buzz', function (dados) {
		console.log(dados);
	});

});
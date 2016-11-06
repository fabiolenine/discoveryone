angular.module("tellbuzzCTRLMain",[])
.controller('tellbuzzControllerMain', function($scope,$http,$window,$interval,$timeout) {
		
	var socket = io.connect('http://tellbuzz.lenines.info');
	
	socket.on('tweet', function (dados) {
		console.log(dados);
	});

});
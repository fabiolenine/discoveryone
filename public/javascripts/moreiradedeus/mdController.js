// javascript/leninesController.js
var mdApp = angular.module('mdApp',[]);

mdApp.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,12);
            });
			
ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});

mdApp.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>5){
                number = number.slice(0, 5) + '-' + number.slice(5,9);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});

mdApp.controller('mdController', function($scope,$http,$window) {
	
	$scope.currencyVal;
	
	var latitude	= -35.717680;
	var longitude	= -9.644430;
	var situacaoGPS = 'permissÃ£o concedida';
	
	var geoOptions 	= { enableHighAccuracy: true,
	                       timeout: 30000,
	                       maximumAge: 3000
                         };
    
    function geoError( err ) {
	   switch( err.code ) {
          case 1:
			// permissao negada pelo usuario
			situacaoGPS = 'permissÃ£o negada pelo usuÃ¡rio';  
            break;

		  case 2:
            // nao foi possivel alcancar os satelites GPS
			situacaoGPS = 'nÃ£o foi possivel alcancar os satelites GPS';   
            break;

		  case 3: 
			// a requisicao demorou demais para retornar
			situacaoGPS = 'requisiÃ§Ã£o demorou demais para retornar';   
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
										retorno: 	'Houve algum problema, peÃ§o desculpa, mas tente mais tarde.'};
                 }
        });
    };
	
	$scope.enviarpesquisa = function(){
		
		$scope.enviopesquisa.location = {lat: latitude, lng: longitude};
		
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions);
		
		$http.get('/pesquisar/nome',$scope.enviopesquisa).success(function(retorno)
        {
            if(retorno){ 
						console.log(retorno);
                        }
            else {
						$scope.msg = {	show: 		true,
										retorno: 	'Nome nÃ£o disponivel on-line, por favor, vÃ¡ pessoalmente o cartÃ³rio'};
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

		$scope.enviopesquisa = { nome:		'',
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
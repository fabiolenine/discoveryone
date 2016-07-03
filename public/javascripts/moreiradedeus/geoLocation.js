	var latitude	= -35.717680;
	var longitude	= -9.644430;
	var situacaoGPS = 'permissão concedida';
	
	var geoOptions 	= { enableHighAccuracy: true,
	                       timeout: 30000,
	                       maximumAge: 3000
                         };
    
    var geoError = function( err ) {
	   switch( err.code ) {
          case 1:
			// permissao negada pelo usuario
			situacaoGPS = 'permissão negada pelo usuário';  
            break;

		  case 2:
            // nao foi possivel alcancar os satelites GPS
			situacaoGPS = 'não foi possivel alcancar os satelites GPS';   
            break;

		  case 3: 
			// a requisicao demorou demais para retornar
			situacaoGPS = 'requisição demorou demais para retornar';   
            break;

		  case 0:
			// ocorreu um erro desconhecido...
			situacaoGPS = 'ocorreu um erro desconhecido';   
			break;
	       }	
    };
    
    var geoSuccess = function(pos){
                latitude  = pos.coords.latitude;
                longitude = pos.coords.longitude;
            };
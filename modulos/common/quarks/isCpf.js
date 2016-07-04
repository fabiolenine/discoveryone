module.exports = function(value){
	
	var regex = /\d/;
	
	var isEmpty = require('./isEmpty.js')(value);
	if(isEmpty) return false;
	
	var validateCpf = require('../hadrons/validateCpf.js')(value);
	if(!validateCpf) return false;
	
	if(value.length != 11) return false;
	
	switch (value) {
		case '00000000000':
		case '11111111111':
		case '22222222222':
		case '33333333333':
		case '44444444444':
		case '55555555555':
		case '66666666666':
		case '77777777777':
		case '88888888888':
		case '99999999999':
		case '06423370478': //teste
			return false;
			break;
		default:
			console.log('Passou pelos cases do Switch...');
	};
	
	return regex.test(value);	
}
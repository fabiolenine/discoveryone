var mdAppNOME = angular.module('formatNome',[]);

mdAppNOME.filter("nome", function() {
	return function(value) {
		if (value) {
			var listaDeNomes = value.split(" ");
			var listaDeNomesFormatada = listaDeNomes.map(function(value) {
																			if (/(da|de|e)/.test(value)) return value;
																			return value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
																			});
			return listaDeNomesFormatada.join(" ");
					};
		return value;
	};
});
var mdAppCNPJ = angular.module('formatCnpj',[]);

mdAppCNPJ.directive('inputCnpj', function($filter, $browser) {
    return{	
			restrict: 'AE',
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl) {	
			
				var listener = function() {
					var value = $element.val().replace(/[^0-9]/g, '');
					$element.val($filter('cnpj')(value, false));
				};

	ngModelCtrl.$parsers.push(function(viewValue) {
					return viewValue.replace(/[^0-9]/g, '').slice(0,14);
				});

	ngModelCtrl.$render = function() {
					$element.val($filter('cnpj')(ngModelCtrl.$viewValue, false));
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

mdAppCNPJ.filter('cnpj', function () {
    return function (cnpj) {
        if (!cnpj) { return ''; }

        var value = cnpj.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return cnpj;
        }

        var number2first, numberlast;

        switch (value.length) {
            case 1:
            case 2:
                number2first 	= value;
                break;

            default:
                number2first 	= value.slice(0, 2);
                numberlast 		= value.slice(2);
        }

        if(numberlast){
            if(numberlast.length>3){
                numberlast = numberlast.slice(0, 3) + '.' + numberlast.slice(3,6) + '/' + numberlast.slice(6,10) + '-' + numberlast.slice(10,12);
            }
            else{
                numberlast = numberlast;
            }

            return (number2first + '.' + numberlast).trim();
        }
        else{
            return number2first;
        }

    };
});
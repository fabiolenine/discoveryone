var mdAppCPF = angular.module('formatCpf',[]);

mdAppCPF.directive('cpfInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('cpf')(value, false));
            };

ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,11);
            });
			
ngModelCtrl.$render = function() {
                $element.val($filter('cpf')(ngModelCtrl.$viewValue, false));
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

mdAppCPF.filter('cpf', function () {
    return function (cpf) {
        if (!cpf) { return ''; }

        var value = cpf.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return cpf;
        }

        var number3first, numberlast;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                number3first 	= value;
                break;

            default:
                number3first 	= value.slice(0, 3);
                numberlast 		= value.slice(3);
        }

        if(numberlast){
            if(numberlast.length>3){
                numberlast = numberlast.slice(0, 3) + '.' + numberlast.slice(3,6) + '-' + numberlast.slice(6,8);
            }
            else{
                numberlast = numberlast;
            }

            return (number3first + '.' + numberlast).trim();
        }
        else{
            return number3first;
        }

    };
});
// js/loginService.js
angular.module('loginService',[])

// super simple service
// each function returns a promise object

.factory('Controllers', function($http) {
    return {
        autenticar  : function(data) {
            return $http.post('/login', data);
        }
    }
});







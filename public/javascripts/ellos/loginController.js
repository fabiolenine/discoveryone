// js/loginController.js
angular.module('loginController',[])

    //inject the Event service factory into our controller
    .controller('loginCTRL', function($scope, $http, Controllers) {
 
    $scope.signin = function(username, senha) {
        //Controllers.autenticar({email: username, password: senha});
        console.log(username);
    };
    
});
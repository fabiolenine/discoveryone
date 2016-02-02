// js/signupController.js
angular.module('signupController',[])

    //inject the Event service factory into our controller
    .controller('signupCTRL', function($scope, $http, Controllers) {
 
    $scope.signin = function(username, senha) {
        //Controllers.autenticar({email: username, password: senha});
        console.log(username);
    };
    
});
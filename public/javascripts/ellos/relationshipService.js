// js/relationshipService.js
angular.module('relationshipService',[])

// super simple service
// each function returns a promise object

.factory('Controllers', function($http) {
    return {
        list              : function() {
            return $http.get('/relationship/list');
        },
        addsocialnetwork  : function(data) {
            return $http.post('/relationship/addsocialnetwork', data);
        },
        addtelefone       : function(data) {
            return $http.post('/relationship/addtelefone', data);
        },
        addemail          : function(data) {
            return $http.post('/relationship/addemail', data);
        },        
        addlotacao        : function(data) {
            return $http.post('/relationship/addlotacao', data);
        },    
        addcomentario    : function(data) {
            return $http.post('/relationship/addcomentario', data);
        },
//        estadoscidadeslista : function() {
//            return $http.get('/estadosecidades/list');
//        },
        salvar            : function(data) {
            return $http.post('/relationship/salvar', data);
        },
        erase             : function(id) {
            return $http.post('/relationship/erase/' + id);
        }
    }
});







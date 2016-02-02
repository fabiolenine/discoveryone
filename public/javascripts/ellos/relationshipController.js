// js/relationshipController.js
angular.module('relationshipController',[])

    //inject the Event service factory into our controller
    .controller('relationshipCTRL', function($scope, $http, Controllers) {
        $scope.formData             = {};
        $scope.predicate            = 'nome';
        $scope.status               = { estado     : 'escolha o Estado',
                                        cidade     : 'escolha a Cidade'};
        $scope.arrayscidades        = [];
        
        $scope.tiposemail           = [ {descricao: 'Pessoal'},
                                        {descricao: 'Trabalho'},
                                        {descricao: 'iCloud'},
                                        {descricao: 'outros'}];
        $scope.tipostelefone        = [ {descricao: 'iPhone'},
                                        {descricao: 'celular'},
                                        {descricao: 'Trabalho'},
                                        {descricao: 'Residencial'},
                                        {descricao: 'Fax'},
                                        {descricao: 'outros'}];
        $scope.tipossocialnetwork   = [ {descricao: 'twitter'},
                                        {descricao: 'facebook'},
                                        {descricao: 'instagram'}];
    
        $scope.emailtipo            = 'Pessoal';
        $scope.ifEmail              = '';
        $scope.telefonetipo         = 'iPhone';
        $scope.ifTelefone           = '';
        $scope.socialnetworktipo    = 'twitter';
        $scope.ifLink               = '';
        $scope.ifData               = '';
        $scope.ifLotacao            = '';
        $scope.ifComentario         = '';
        $scope.cor                  = { nivel01: 'btn-danger',
                                        nivel02: 'btn-warning',
                                        nivel03: 'btn-success',
                                        nivel04: 'btn-info',
                                        nivel05: 'btn-primary'};
        
        $scope.alterar  = function(data) {
            console.log(data);
            switch(data) {
                case "RED":
                    $scope.cor     = {  nivel01: 'btn-danger',
                                        nivel02: 'btn-default',
                                        nivel03: 'btn-default',
                                        nivel04: 'btn-default',
                                        nivel05: 'btn-default'};
                    break;
                case "ORANGE":
                    $scope.cor     = {  nivel01: 'btn-warning',
                                        nivel02: 'btn-warning',
                                        nivel03: 'btn-default',
                                        nivel04: 'btn-default',
                                        nivel05: 'btn-default'};
                    break;
                case "GREEN":
                    $scope.cor     = {  nivel01: 'btn-success',
                                        nivel02: 'btn-success',
                                        nivel03: 'btn-success',
                                        nivel04: 'btn-default',
                                        nivel05: 'btn-default'};
                    break;
                case "CYAN":
                    $scope.cor     = {  nivel01: 'btn-info',
                                        nivel02: 'btn-info',
                                        nivel03: 'btn-info',
                                        nivel04: 'btn-info',
                                        nivel05: 'btn-default'};
                    break;
                case "BLUE":
                    $scope.cor     = {  nivel01: 'btn-primary',
                                        nivel02: 'btn-primary',
                                        nivel03: 'btn-primary',
                                        nivel04: 'btn-primary',
                                        nivel05: 'btn-primary'};
                    break;
                default:
                    $scope.cor     = {  nivel01: 'btn-danger',
                                        nivel02: 'btn-warning',
                                        nivel03: 'btn-success',
                                        nivel04: 'btn-info',
                                        nivel05: 'btn-primary'};
            };
        };
                
        // Novo ===================================================================================
        $scope.novo = function(){
            $scope.formData = {};
            $scope.formData.situacao = "NOVO";
            $scope.alterar("NOVO");
            console.log($scope.formData.situacao);
            console.log($scope.cor);
        };

        
        // List ===================================================================================
        // When landing on the page, get all events and show them
        // use the service to get all the events
        Controllers.list()
            .success(function(data) {
                $scope.collections = data;
            });
    
        // Insert =================================================================================
        // When submitting the add form, send the text to the node API
        $scope.salvar = function() {
            
            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same event anymore
            
            if(!$.isEmptyObject($scope.formData)) {
                
                // call the insert function from our service (returns a promise object)
                Controllers.salvar($scope.formData)
                
                // if successful creation, call our get function to get all the new events
                
                .success(function(data) {
                    
                    $scope.pesquisa(data,function(callback){
                        if(callback == -1){
                            console.log(data);
                            console.log(callback);
                            $scope.collections.push(data);
                        }
                        else {
                            console.log(callback);
                            $scope.collections[callback] = data;
                        }
                    });
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                });
            }
        };

        // Editar =================================================================================
        // Atualiza os campos com o registro corrente.
        $scope.editar = function(data){
            console.log(data);
            $scope.formData = data;
            $scope.alterar(data.situacao);
        };
        
        // Erase ==================================================================================
        // delete a event after checking it
        $scope.erase = function(data) {
            Controllers.erase(data._id)
                //if successful insert, call our list function to list all the new events
            .success(function(retorno) {
                var index = $scope.collections.indexOf(data);
                // $scope.collections.splice(index,1);
                // usar as duas linhas acima comentadas, no projeto provider.
                $scope.collections[index].forauso = true;
            });
        };
    
        $scope.pesquisa = function(data,callback){
            var index = -1;
                    
            for(i = 0; i < $scope.collections.length; i++) {
                if($scope.collections[i]._id == data._id) {
                    console.log(i);
                    return i;
                }
            }
            console.log(index);
            return index;
        };

// ===================================================================
// EMAIL =============================================================
// ===================================================================
        $scope.escolhatipoemail = function(data) {
            $scope.emailtipo = data; 
        };
    
        $scope.insertemail = function(dataid,datatipo,datadescricao) {
            Controllers.addemail({_id: dataid, emails: {tipo: datatipo, email: datadescricao, forauso: false}})    
                .success(function(data) {
                    $scope.formData.emails.push({tipo: datatipo, email: datadescricao, forauso: false});
                    delete $scope.ifEmail;
            });
        };
        
        $scope.eraseemail = function(datas) {
            $scope.formData.emails = datas.filter(function(data) {
                if (!data.selecionado) return data
            });
        };

// ===================================================================
// TELEFONE ==========================================================
// ===================================================================
        $scope.escolhatipotelefone = function(data) {
            $scope.telefonetipo = data; 
        };
    
        $scope.inserttelefone = function(dataid,datatipo,datadescricao) {
            Controllers.addtelefone({_id: dataid, telefones: {tipo: datatipo, numero: datadescricao, forauso: false}})    
                .success(function(data) {
                    $scope.pesquisa(data,function(callback){
                        if(callback == -1){
                            console.log(data);
                            console.log(callback);
                            $scope.collections.push(data);
                            
                            //$scope.formData.telefones.push({tipo: datatipo, numero: datadescricao, forauso: false});        
                            delete $scope.ifTelefone;
                        }
                        else {
                            console.log(callback);
//                            $scope.collections[callback] = data;
                        } 
                    });
            });
        };
        
        $scope.erasetelefone = function(datas) {
            $scope.formData.telefones = datas.filter(function(data) {
                if (!data.selecionado) return data
            });
        };

// ===================================================================
// LOTACAO ===========================================================
// ===================================================================    
        $scope.insertlotacao = function(dataid,data,descricao) {
            Controllers.addlotacao({_id: dataid, lotacoes: {datalotacao: data, lotacao: descricao, forauso: false}})    
                .success(function(data) {            
                    $scope.formData.lotacoes.push({data: data, lotacao: descricao, forauso: false});
                    delete $scope.ifLotacao;
                    delete $scope.ifData;
            });
        };
        
        $scope.eraseLotacao = function(datas) {
            $scope.formData.lotacoes = datas.filter(function(data) {
                if (!data.selecionado) return data
            });
        };

// ===================================================================
// SOCIAL NETWORK ====================================================
// ===================================================================    
        $scope.escolhatiposocialnetwork = function(data) {
            $scope.socialnetworktipo = data; 
        };
    
        $scope.insertsocialnetwork = function(dataid,datatipo,datadescricao) {
            Controllers.addsocialnetwork({_id: dataid, socialnetworks: {tipo: datatipo, link: datadescricao, forauso: false}})    
                .success(function(data) {            
                    $scope.formData.socialnetworks.push({tipo: datatipo, link: datadescricao, forauso: false});
                    delete $scope.ifLink;
            });
        };
        
        $scope.erasesocialnetwork = function(datas) {
            $scope.formData.socialnetworks = datas.filter(function(data) {
                if (!data.selecionado) return data
            });
        };    

// ===================================================================
// COMENTARIOS =======================================================
// ===================================================================
        $scope.insertcomentario = function(dataid,datanome,datatexto) {
            Controllers.addcomentario({_id: dataid, comentarios: {nome: datanome, texto: datatexto, forauso: false}})    
                .success(function(data) {            
                    $scope.formData.comentarios.push({nome: datanome, texto: datatexto, forauso: false});
                    delete $scope.ifComentario;
            });
        };
        
        $scope.erasecomentario = function(datas) {
            $scope.formData.comentarios = datas.filter(function(data) {
                if (!data.selecionado) return data
            });
        };            

});
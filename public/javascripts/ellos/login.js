jQuery( document ).ready(function( $ ) {

	var cmpDeSenha = jQuery("#user\\.deSenha");
	var cmpCdUser = jQuery("#user\\.cdUser");
	var linkLembrarSenha = jQuery("#lembrarSenha");
	var btSubmit = jQuery("#btSubmit");

	linkLembrarSenha.bind("click", function(event){

		var cdUser = cmpCdUser.val();

		if (isEmail(cdUser)) {
			linkLembrarSenha.attr("href", "www.google.com");

		} else {	
			linkLembrarSenha.removeAttr("href");
		}
	});	

	cmpCdUser.bind("change", function(event){
		
		var cdUser = cmpCdUser.val();

		if (isEmail(cdUser)) {
			event.preventDefault();
			$('#sucessAlert').slideUp();

		} else {
			event.preventDefault();
			$('#sucessAlert').slideDown();
		}
	});	

	cmpDeSenha.bind("keyup", function(event){
		
		var deSenha = cmpDeSenha.val();
		var cdUser = cmpCdUser.val();

		if  (deSenha.length > 3 && isEmail(cdUser)) {
			// alert("Maior que 3 "+deSenha.length);
			btSubmit.removeAttr("disabled");
		} else {
			// alert("Menor que 3 "+deSenha.length);
			btSubmit.attr("disabled", "disabled");

		}
	});

});

function isEmail(email){
    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
    var check=/@[\w\-]+\./;
    var checkend=/\.[a-zA-Z]{2,3}$/;
    if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}
    else {return true;}
}
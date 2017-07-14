function funcSignup(){
    
    $('#contentBenvenuto').hide();
    $('#contentLogin').hide();
    $('#contentEventi').hide();
    $('#contentASG').hide();
    $('#contentCampo').hide();
    $('#contentDescEventi').hide();
    $('#contentSquadra').hide();
    $('#contentUtenti').hide();
    $('#contentSignin').show();
    
    $('#inviaSignin').unbind().click(function() {
        var nick = $('#nickSU').val();
        var pass = $('#passSU').val();
        var email = $('#emailSU').val();
        var nome = $('#nomeSU').val();
        var cognome = $('#cognomeSU').val();
        var json = {"nick":nick, "pass":pass, "nome":nome, "cognome":cognome, "email":email};
        $.getJSON('scriptPHP/signup.php',json,function(response){
            if(response){
                if(response == "OK"){
                    var nick = $('#nickSU').val();
                    var email = $('#emailSU').val();
                    var nome = $('#nomeSU').val();
                    var cognome = $('#cognomeSU').val();
                    var json = {"nick":nick, "nome":nome, "cognome":cognome, "email":email};
                    $.getJSON('scriptPHP/sendEmail.php',json,function(response){
                        if(response){
                            alert(response);
                            
                            if(response=='Registrato.'){
                                $('#contentSignin').hide();
                                
                                document.getElementById("nickSU").value = "";
                                document.getElementById("passSU").value = "";
                                document.getElementById("emailSU").value = "";
                                document.getElementById("nomeSU").value = "";
                                document.getElementById("cognomeSU").value = "";
                                $('#contentBenvenuto').show();
                        
                                $('#contentNonLoggato').hide();
                                $('#contentLoggato').show();
                                $('#contentNotizie').hide();
                                $('#contentNonLoggatoSuccessiva').hide();
                                $('#contentUltimoPassaggio').hide();
                            }
                        }
                    });
                }
                else if(response == "Indirizzo email errato"){
                    alert(response);
                }
                else{
                    alert(response);
                }
            }
        });
    });
}

$(document).ready(function(){
    $('#btnSignin').click(function(){
        funcSignup()
    });
});
$(document).ready(function(){
    $('#btnLogout').hide();
    
    $('#btnLogin').click(function(){
        $('#contentLogin').show();
        $('#contentSignin').hide();
        $('#contentLogin').empty();
        var text = $('<div align="center">Nickname:<input type="text" id="nickSI" value=""></br>Password:<input type="password" id="passSI" value=""></br><button type="button" class="btn btn-primary navbar-btn" id="inviaLogin">INVIA</button></div>');
        $('#contentLogin').append(text);
        $('#inviaLogin').click(function() {
            var nick = $('#nickSI').val();
            var pass = $('#passSI').val();
            var json = {"nick":nick, "pass":pass};
            $.getJSON('scriptPHP/login.php',json,function(response){
                if(response){
                    alert(response);
                    $('#contentLogin').hide();
                    $('#btnLogout').show();
                }
            });
        });
    });
    
    $('#btnLogout').click(function(){
        $.getJSON('scriptPHP/logout.php',function(response){
            if(response){
                    alert(response);
                    $('#btnLogout').hide();
                }
            });
    });
    
    $('#btnSignin').click(function(){
        $('#contentLogin').hide();
        $('#contentSignin').show();
        $('#contentSignin').empty();
        var text = $('<div align="center"><table><tr><td>Nome:</td><td><input type="text" id="nomeSU" value=""></td></tr><tr><td>Cognome:</td><td><input type="text" id="cognomeSU" value=""></td></tr><tr><td>Nickname:</td><td><input type="text" id="nickSU" value=""></td></tr><tr><td>E-Mail:</td><td><input type="text" id="emailSU" value=""></td></tr><tr><td>Password:</td><td><input type="password" id="passSU" value=""></td></tr></table></div><div align="center"><button type="button" class="btn btn-primary navbar-btn" id="inviaSignin">INVIA</button></div>');
        $('#contentSignin').append(text);
        $('#inviaSignin').click(function() {
            var nick = $('#nickSU').val();
            var pass = $('#passSU').val();
            var email = $('#emailSU').val();
            var nome = $('#nomeSU').val();
            var cognome = $('#cognomeSU').val();
            var json = {"nick":nick, "pass":pass, "nome":nome, "cognome":cognome, "email":email};
            $.getJSON('scriptPHP/signup.php',json,function(response){
                if(response){
                    alert(response);
                    $('#contentSignin').hide();
                    $('#btnLogout').show();
                }
            });
        });
    });
});
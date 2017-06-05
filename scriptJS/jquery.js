function funcEvento(a){
    $('#contentEventi').empty();
    alert(a);
    var json = {"descEvento":a};
    $.getJSON('scriptPHP/getDescEvento.php',json,function(response) {
        if(response){
            var table = $('<table id="tbDescEvento" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var data =  v['Data'];
                var dateAr = data.split('-');
                var newDate = dateAr[2] + '/' + dateAr[1] + '/' + dateAr[0];
                var row = $('<tr><td><h3>'+v['Nome']+'</h3></td><td> '+newDate+'</td></tr><tr><td colspan="2" class="bordo">'+v['Descrizione']+'</td></tr><tr><td colspan="2"><button id="btnPartecipa" class="btn btn-primary">Partecipa</button></td></tr>');
                table.append(row);
            });
            $('#contentEventi').append(table);
        }
    });
}

$(document).ready(function(){
    $('#btnLogout').hide();
    $('#tue_asg').hide();
    
    $.getJSON('scriptPHP/sessionWiew.php',function(response){
        if(response){
            if(response=='show'){
                $('#btnLogout').show();
                $('#tue_asg').show();
            }
        }
    });
    
    $('#home').click(function(){
        $('#contentLogin').hide();
        $('#contentSignin').hide();
        $('#contentASG').hide();
        $('#contentCampo').hide();
        $('#contentDescEventi').hide();
        $('#contentSquadra').hide();
        $('#contentUtenti').hide();
        $('#contentEventi').show();
        $('#contentEventi').empty();
        $.getJSON('scriptPHP/getEventi.php',function(response) {
            if(response){
                var table = $('<table id="tbEventi" class="responsive-table"></table>');
                $.each(response,function(k,v){
                    var data =  v['Data'];
                    var dateAr = data.split('-');
                    var newDate = dateAr[2] + '/' + dateAr[1] + '/' + dateAr[0];
                    var row = $('<tr><td><h3><a id="descEvento" href="" class="black-text" value="'+v['id']+'" onclick="funcEvento('+v['id']+');return false;">'+v['Nome']+'</a></h3></td><td> '+newDate+'</td></tr><tr><td colspan="2" class="bordo">'+v['Descrizione']+'</td></tr>');
                    table.append(row);
                });
                $('#contentEventi').append(table);
            }
        });
    });
    
    $('#squadra').click(function() {
        $('#contentLogin').hide();
        $('#contentSignin').hide();
        $('#contentASG').hide();
        $('#contentCampo').hide();
        $('#contentUtenti').hide();
        $('#contentEventi').hide();
        $('#contentDescEventi').hide();
        $('#contentSquadra').show();
        $('#contentSquadra').empty();
        $.getJSON('scriptPHP/getUtenti.php',function(response) {
            if(response){
                var table = $('<table id="tbSquadra" class="responsive-table"></table>');
                $.each(response,function(k,v){
                    var row = $('<tr><a id="descUtente" class="black-text" value="'+v['id']+'"><td><h3>'+v['Nickname']+'</h3></td></a><td> '+v['Ruolo']+'</td><td> '+v['Stato']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                    table.append(row);
                });
                $('#contentSquadra').append(table);
            }
        });
    });
    
    $('#descUtente').click(function() {
        $('#contentSquadra').empty();
        var utente = $('#descUtente').val();
        alert(utente);
        $.getJSON('scriptPHP/getUtenti.php',function(response) {
            if(response){
                var table = $('<table id="tbSquadra" class="responsive-table"></table>');
                $.each(response,function(k,v){
                    var row = $('<tr><td><h3>'+v['Nickname']+'</h3></td><td> '+v['Ruolo']+'</td><td> '+v['Permessi']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                    table.append(row);
                });
                $('#contentSquadra').append(table);
            }
        });
    });
    
    $('#campi').click(function() {
        $('#contentLogin').hide();
        $('#contentSignin').hide();
        $('#contentASG').hide();
        $('#contentSquadra').hide();
        $('#contentUtenti').hide();
        $('#contentEventi').hide();
        $('#contentDescEventi').hide();
        $('#contentCampo').show();
        $('#contentCampo').empty();
        $.getJSON('scriptPHP/getCampi.php',function(response) {
            if(response){
                var table = $('<table id="tbSquadra" class="responsive-table"></table>');
                $.each(response,function(k,v){
                    var row = $('<tr><td class="bordo"><h3><a id="descCampo" class="black-text" href="#" value="'+v['id']+'">'+v['Nome']+'</a></h3></td><td class="bordo"> '+v['Via']+'</td></tr>');
                    table.append(row);
                });
                $('#contentCampo').append(table);
            }
        });
    });
    
    $('#campi').click(function() {
        
    });
    
    $('#btnLogin').click(function(){
        $('#contentLogin').show();
        $('#contentSignin').hide();
        $('#contentASG').hide();
        $('#contentCampo').hide();
        $('#contentSquadra').hide();
        $('#contentDescEventi').hide();
        $('#contentUtenti').hide();
        $('#contentEventi').hide();
        $('#contentLogin').empty();
        var text = $('<div align="center">Nickname<input type="text" id="nickSI" value=""></br>Password<input type="password" id="passSI" value=""></br><button type="button" class="btn btn-primary navbar-btn" id="inviaLogin">INVIA</button></div>');
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
                    $('#tue_asg').show();
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
        $('#contentEventi').hide();
        $('#contentASG').hide();
        $('#contentCampo').hide();
        $('#contentDescEventi').hide();
        $('#contentSquadra').hide();
        $('#contentUtenti').hide();
        $('#contentSignin').show();
        $('#contentSignin').empty();
        var text = $('<div align="center">Nome<input type="text" id="nomeSU" value=""></br>Cognome<input type="text" id="cognomeSU" value=""></br>Nickname<input type="text" id="nickSU" value=""></br>E-Mail<input type="text" id="emailSU" value=""></br>Password<input type="password" id="passSU" value=""></br><button type="button" class="btn btn-primary navbar-btn" id="inviaSignin">INVIA</button></div>');
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
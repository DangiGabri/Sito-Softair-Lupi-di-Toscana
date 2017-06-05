function funcEvento(a){
    $('#contentEventi').empty();
    var json = {"descEvento":a};
    $.getJSON('scriptPHP/getDescEvento.php',json,function(response) {
        if(response){
            var table = $('<table id="tbDescEvento" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var data =  v['Data'];
                var dateAr = data.split('-');
                var newDate = dateAr[2] + '/' + dateAr[1] + '/' + dateAr[0];
                var row = $('<tr><td><h3>'+v['Nome']+'</h3></td><td> '+newDate+'</td></tr><tr><td colspan="2" class="bordo">'+v['Descrizione']+'</td></tr><tr><td id="btnGestione" colspan="2"><button id="btnPartecipa" class="btn btn-primary">Partecipa</button></td></tr><tr><td id="btnGestione" colspan="2"><button id="btnModificaEvento" class="btn btn-primary">Modifica</button></td></tr>');
                table.append(row);
            });
            
            $.getJSON('scriptPHP/eventoPermisWiew.php',function(response) {
                if(response){
                    if(response=='hide' || response=='null'){
                        $('#btnModificaEvento').hide();
                    }
                }
            });
            
            $.getJSON('scriptPHP/sessionWiew.php',function(response){
                if(response){
                    if(response=='hide'){
                        $('#btnPartecipa').hide();
                    }
                }
            });
            
            $('#contentEventi').append(table);
            
            $('#btnModificaEvento').click(function() {
                $('#contentEventi').empty();
                var text = $('<div align="center">Nome<input type="text" id="nomeEvento" value=""></br>Data<input id="dataEvento" type="date" class="datepicker"></br>Descrizione<textarea id="descrizioneEvento" class="materialize-textarea"></textarea></br><button type="button" class="btn btn-primary navbar-btn" id="modificaEvento">MODIFICA</button></br></div>');
                $('#contentEventi').append(text);
                $('.datepicker').pickadate({
                    selectMonths: true,
                    selectYears: 15
                });
                var dataA =  $('#dataEvento').val();
                var dateAr = dataA.split('/');
                var newDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];
                var nome = $('#nomeEvento').val();
                var descrizione = $('#descrizioneEvento').val();
                var json = {"id":a,"nome":nome, "descrizione":descrizione, "data":newDate};
                $.getJSON('scriptPHP/updateEvento.php',json,function(response) {
                if(response){
                    
                }
            });
            });
        }
    });
}

function funcUtente(a){
    $('#contentSquadra').empty();
    var json = {"descUtente":a};
    $.getJSON('scriptPHP/getDescUtenti.php',json,function(response) {
        if(response){
            var table = $('<table id="tbSquadra" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td><h3>'+v['Nickname']+'</h3></td><td> '+v['Ruolo']+'</td><td> '+v['Stato']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr><tr><td id="btnGestione" colspan="3"><button id="btnModificaUtente" class="btn btn-primary">Modifica</button></td></tr>');
                table.append(row);
            });
            $.getJSON('scriptPHP/utentePermisWiew.php',function(response) {
                if(response){
                    if(response=='hide' || response=='null'){
                        $('#btnModificaUtente').hide();
                    }
                }
            });
            $('#contentSquadra').append(table);
        }
    });
} 

function funcCampo(a){
    $('#contentEventi').hide();
    $('#contentCampo').show();
    $('#contentCampo').empty();
    var json = {"descCampo":a};
    $.getJSON('scriptPHP/getDescCampi.php',json,function(response) {
        if(response){
            var table = $('<table id="tbSquadra" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td class="bordo"><h3>'+v['NomeCampo']+'</h3></td><td class="bordo"> '+v['Via']+'</td></tr><tr><td id="btnGestione" colspan="2"><button id="btnModificaCampo" class="btn btn-primary">Modifica</button></td></tr>');
                table.append(row);
            });
            $.getJSON('scriptPHP/utentePermisWiew.php',function(response) {
                if(response){
                    if(response=='hide' || response=='null'){
                        $('#btnModificaCampo').hide();
                    }
                }
            });
            $('#contentCampo').append(table);
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
                var div = $('<div class="center"></br><button id="btnInserisciEvento" class="btn btn-primary">INSERISCI EVENTO</button></div>')
                var table = $('<table id="tbEventi" class="responsive-table"></table>');
                $.each(response,function(k,v){
                    var data =  v['Data'];
                    var dateAr = data.split('-');
                    var newDate = dateAr[2] + '/' + dateAr[1] + '/' + dateAr[0];
                    var row = $('<tr><td><h3><a id="descEvento" href="" class="black-text" onclick="funcEvento('+v['id']+');return false;">'+v['Nome']+'</a></h3></td><td> '+newDate+'</td></tr><tr><td colspan="2"><h5><a id="descEvento" href="" class="black-text" onclick="funcCampo('+v['idCampo']+');return false;">'+v['NomeCampo']+'</a></h5></td></tr><tr><td colspan="2" class="bordo">'+v['Descrizione']+'</td></tr>');
                    table.append(row);
                });
                div.append(table);
                $('#contentEventi').append(div);
                
                $.getJSON('scriptPHP/eventoPermisWiew.php',function(response) {
                    if(response){
                        if(response=='hide'){
                            $('#btnInserisciEvento').hide();
                        }
                    }
                });
                
                $('#btnInserisciEvento').click(function() {
                    $('#contentEventi').empty();
                    var text = $('<div align="center" id="inserisciEventoDiv">Nome<input type="text" id="nomeEvento" value=""></br>Data<input id="dataEvento" type="date" class="datepicker"></br>Campo</div>');
                    
                    $('#contentEventi').append(text);
                    $.getJSON('scriptPHP/getCampi.php',function(response) {
                        if(response){
                            var select = $('<select id="campoEvento"></select>');
                            $.each(response,function(k,v){
                                var row = $('<option value="'+v['idCampo']+'">'+v['NomeCampo']+'</option>');
                                select.append(row);
                            });
                            $('#inserisciEventoDiv').append(select);
                        }
                    });
                    var desc = $('</br>Descrizione<textarea id="descrizioneEvento" class="materialize-textarea"></textarea></br><button type="button" class="btn btn-primary navbar-btn" id="inserisciEvento">INSERISCI</button></br>');
                    $('#inserisciEventoDiv').append(desc);
                    $('.datepicker').pickadate({
                        selectMonths: true,
                        selectYears: 15
                    });
                    
                    $('#inserisciEvento').click(function() {
                        var dataA =  $('#dataEvento').val();
                        var dateAr = dataA.split('/');
                        var newDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];
                        var nome = $('#nomeEvento').val();
                        var descrizione = $('#descrizioneEvento').val();
                        var json = {"id":a,"nome":nome, "descrizione":descrizione, "data":newDate};
                        $.getJSON('scriptPHP/signup.php',json,function(response){
                            if(response){
                                alert(response);
                                $('#contentSignin').hide();
                                $('#btnLogout').show();
                                $('#tue_asg').show();
                            }
                        });
                    });
                });
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
                    var row = $('<tr><td><a id="descUtente" href="" class="black-text" value="'+v['id']+'" onclick="funcUtente('+v['id']+');return false;"><h3>'+v['Nickname']+'</h3></a></td><td> '+v['Ruolo']+'</td><td> '+v['Stato']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
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
                    var row = $('<tr><td class="bordo"><h3><a id="descCampo" href="" class="black-text" onclick="funcCampo('+v['idCampo']+');return false;">'+v['NomeCampo']+'</a></h3></td><td class="bordo"> '+v['Via']+'</td></tr>');
                    table.append(row);
                });
                $('#contentCampo').append(table);
            }
        });
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
        var text = $('<div align="center">Nickname<input type="text" id="nickSI" value=""></br>Password<input type="password" id="passSI" value=""></br><button type="button" class="btn btn-primary navbar-btn" id="inviaLogin">INVIA</button></br></div>');
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
                    $('#tue_asg').hide();
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
        var text = $('<div align="center">Nome<input type="text" id="nomeSU" value=""></br>Cognome<input type="text" id="cognomeSU" value=""></br>Nickname<input type="text" id="nickSU" value=""></br>E-Mail<input type="text" id="emailSU" value=""></br>Password<input type="password" id="passSU" value=""></br><button type="button" class="btn btn-primary navbar-btn" id="inviaSignin">INVIA</button></br></div>');
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
                    $('#tue_asg').show();
                }
            });
        });
    });
});
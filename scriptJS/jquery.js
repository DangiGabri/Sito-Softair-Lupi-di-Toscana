function funcEvento(a){
    $('#contentEventiDinamic').empty();
    
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
            
            $('#contentEventiDinamic').append(table);
            
            $('#btnModificaEvento').hide();
            $('#btnPartecipa').hide();
            
            $.getJSON('scriptPHP/eventoPermisWiew.php',function(response) {
                if(response){
                    if(response=='show'){
                        $('#btnModificaEvento').show();
                    }
                }
            });
            
            $.getJSON('scriptPHP/sessionWiew.php',function(response){
                if(response){
                    if(response!="null"){
                        $('#btnPartecipa').show();
                    }
                }
            });
            
            $('#btnModificaEvento').click(function() {
                $('#btnInserisciEvento').hide();
                $('#contentInserimentoEventi').show();
                $('#selectCampoEvento').show();
                $('#contentEventiDinamic').empty();
                
                $.getJSON('scriptPHP/getCampi.php',function(response) {
                        if(response){
                            $.each(response,function(k,v){
                                var row = $('<option value="'+v['idCampo']+'">'+v['NomeCampo']+'</option>');
                                $('#selectCampoEvento').append(row);
                            });
                        }
                    });
                
                var button = $('<button type="button" class="btn btn-primary navbar-btn" id="modificaEvento">MODIFICA</button>')
                $('#btnEventoInserisciModifica').empty();
                $('#btnEventoInserisciModifica').append(button);
                
                $('#modificaEvento').click(function(){
                    var data =  $('#dataInserimentoEvento').val();
                    var dateAr = data.split(' ');
                    
                    var json = {"mese":dateAr[1]};
                    $.getJSON('scriptPHP/monthConverter.php',json,function(response){
                        if(response){
                            var mese = response;
                            var data =  $('#dataInserimentoEvento').val();
                            var dateAr = data.split(' ');
                            dateAr[1]= mese;
                            
                            var newDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];
                            
                            var nome = $('#nomeEvento').val();
                            var descrizione = $('#descrizioneEvento').val();
                            var campo = $('#selectCampoEvento').val();
                            
                            var json = {"nome":nome, "descrizione":descrizione, "data":newDate, "campo":campo};
                    
                            $.getJSON('scriptPHP/updateEvento.php',json,function(response){
                                if(response){
                                    alert(response);
                                    $('#contentInserimentoEventi').hide();
                                }
                            });
                        }
                    });
                });
            });
        }
    });
}

function funcUtente(a){
    $('#contentSquadraDinamic').empty();
    
    var json = {"descUtente":a};
    $.getJSON('scriptPHP/getDescUtenti.php',json,function(response) {
        if(response){
            var table = $('<table id="tbSquadra" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td><h3>'+v['Nickname']+'</h3></td><td> '+v['Ruolo']+'</td><td> '+v['Stato']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr><tr><td id="btnGestione" colspan="3"><button id="btnModificaUtente" class="btn btn-primary">Modifica</button></td></tr>');
                table.append(row);
            })
            
            $('#contentSquadraDinamic').append(table);
            $('#btnModificaUtente').hide();
            
            $.getJSON('scriptPHP/utentePermisWiew.php',function(response) {
                if(response){
                    if(response=='show'){
                        $('#btnModificaUtente').show();
                    }
                }
            });
            
            $('#btnModificaUtente').click(function() {
                $('#contentSquadraDinamic').hide();
                $('#contentUpdateUtente').show();
                // $('#selectRuoliUtente').show();
                // $('#selectPermessiUtente').show();
                $('#nickUtenteSelezionato').empty();
                $('#selectRuoliUtente').empty();
                $('#selectPermessiUtente').empty();
                
                
                
                $('#colonnaSelectRuoli').find('*').not('#selectRuoliUtente').remove();
                $('#colonnaSelectPermessi').find('*').not('#selectPermessiUtente').remove();
                
                $.each(response,function(k,v){
                    var label = $('<div align="center"><h3>' + v['Nickname'] + '</h3></div>')
                    $('#nickUtenteSelezionato').append(label);
                    var row = $(v['Descrizione']);
                    alert(row);
                    document.getElementById("descrizioneUtenteUpdate").value = row[0];
                });
                
                $.getJSON('scriptPHP/getRuoli.php',function(response) {
                    if(response){
                        $.each(response,function(k,v){
                            var row1 = $('<option value="'+v['id']+'" data-icon="immagini/ruoli/'+v['Ruolo']+'.png" class="left circle">'+v['Ruolo']+'</option>');
                            $('#selectRuoliUtente').append(row1);
                        });
                    }
                });
                
                $.getJSON('scriptPHP/getPermessi.php',function(response) {
                    if(response){
                        $.each(response,function(k,v){
                            var row = $('<option value="'+v['idPermesso']+'">'+v['Stato']+'</option>');
                            $('#selectPermessiUtente').append(row);
                        });
                        $(document).ready(function() {
                            $('.selectInit').material_select();
                        });
                    }
                });
                
                $('btnModificaPermessiUtente').click(function(){
                    var ruolo = $('#selectRuoliUtente').val();
                    var permesso = $('#selectPermessiUtente').val();
                    var desc = $('#descrizioneUtenteUpdate').val();
                    
                    var json = {"ruolo":ruolo, "permesso":permesso, 'desc':desc};
                    
                    alert(json);
                    // $.getJSON('scriptPHP/insertEvento.php',json,function(response){
                    //     if(response){
                    //         alert(response);
                    //         $('#contentInserimentoEventi').hide();
                    //     }
                    // });
                });
            });
            
        }
    });
} 

function funcCampo(a){
    $('#contentCampoDinamic').show();
    $('#contentCampoDinamic').empty();
    
    var json = {"descCampo":a};
    
    $.getJSON('scriptPHP/getDescCampi.php',json,function(response) {
        if(response){
            var table = $('<table id="tbCampi" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td class="bordo"><h3>'+v['NomeCampo']+'</h3></td><td class="bordo"> '+v['Via']+'</td></tr><tr><td id="btnGestione" colspan="2"><button id="btnModificaCampo" class="btn btn-primary">Modifica</button></td></tr>');
                table.append(row);
            });
            
            $('#btnModificaCampo').hide();
            
            $.getJSON('scriptPHP/utentePermisWiew.php',function(response) {
                if(response){
                    if(response=='show'){
                        $('#btnModificaCampo').show();
                    }
                }
            });
            $('#contentCampoDinamic').append(table);
        }
    });
}

function funcASG(a){
    $('#contentASGDinamic').empty();
    
    var json = {"id":a};
    
    $.getJSON('scriptPHP/getASG.php',json,function(response) {
        if(response){
            var table = $('<table id="tbDescASG" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td><h3>'+v['Nome']+'</h3></td><td>Marca: '+v['Marca']+'</td><td>Potenza: '+v['Potenza']+'</td></tr><tr><td colspan="3"><img class="responsive-img imgRinchiusa" src="immagini/armi/'+v['Nome']+'.jpg"></td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                table.append(row);
            });
            $('#contentASGDinamic').append(table);
        }
    });
}

$(document).ready(function(){
    $('#contentLogin').hide();
    $('#contentSignin').hide();
    $('#contentASG').hide();
    $('#contentCampo').hide();
    $('#contentDescEventi').hide();
    $('#contentSquadra').hide();
    $('#contentUtenti').hide();
    $('#contentEventi').hide();
    $('#btnLogout').hide();
    $('#tue_asg').hide();
    
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
    
    $.getJSON('scriptPHP/sessionWiew.php',function(response){
        if(response){
            if(response!="null"){
                $('#btnLogout').show();
                $('#tue_asg').show();
            }
        }
    });
    
    $('#home').click(function(){
        $('#btnInserisciEvento').hide();
        $('#contentInserimentoEventi').hide();
        
        $('#contentLogin').hide();
        $('#contentSignin').hide();
        $('#contentASG').hide();
        $('#contentCampo').hide();
        $('#contentDescEventi').hide();
        $('#contentSquadra').hide();
        $('#contentUtenti').hide();
        $('#contentEventi').show();
        $('#contentEventiDinamic').empty();
        $('#contentEventiDinamic').show();
        
        $.getJSON('scriptPHP/getEventi.php',function(response) {
            if(response){
                var table = $('<table id="tbEventi" class="responsive-table"></table>');
                $.each(response,function(k,v){
                    var data =  v['Data'];
                    var dateAr = data.split('-');
                    var newDate = dateAr[2] + '/' + dateAr[1] + '/' + dateAr[0];
                    var row = $('<tr><td><h3><a id="descEvento" href="" class="black-text" onclick="funcEvento('+v['id']+');return false;">'+v['Nome']+'</a></h3></td><td> '+newDate+'</td></tr><tr><td colspan="2"><h5><a id="descEvento" href="" class="black-text" onclick="funcCampo('+v['idCampo']+');return false;">'+v['NomeCampo']+'</a></h5></td></tr><tr><td colspan="2" class="bordo">'+v['Descrizione']+'</td></tr>');
                    table.append(row);
                });
                $('#contentEventiDinamic').append(table);
                
                $.getJSON('scriptPHP/eventoPermisWiew.php',function(response) {
                    if(response){
                        if(response=='show'){
                            $('#btnInserisciEvento').show();
                        }
                    }
                });
                
                $('#btnInserisciEvento').click(function() {
                    $('#contentEventiDinamic').hide();
                    $('#btnInserisciEvento').hide();
                    $('#contentInserimentoEventi').show();
                    $('#selectCampoEvento').show();
                    
                    document.getElementById("dataInserimentoEvento").value = "";
                    document.getElementById("nomeEvento").value = "";
                    document.getElementById("descrizioneEvento").value = "";
                    $('#selectCampoEvento').empty();
                    
                    $.getJSON('scriptPHP/getCampi.php',function(response) {
                        if(response){
                            $.each(response,function(k,v){
                                var row = $('<option value="'+v['idCampo']+'">'+v['NomeCampo']+'</option>');
                                $('#selectCampoEvento').append(row);
                            });
                        }
                    });
                    
                    var button = $('<button type="button" class="btn btn-primary navbar-btn" id="inserisciEvento">INSERISCI</button>')
                    $('#btnEventoInserisciModifica').empty();
                    $('#btnEventoInserisciModifica').append(button);
                    
                    $('#inserisciEvento').click(function() {
                        var data =  $('#dataInserimentoEvento').val();
                        var dateAr = data.split(' ');
                        
                        var json = {"mese":dateAr[1]};
                        $.getJSON('scriptPHP/monthConverter.php',json,function(response){
                            if(response){
                                var mese = response;
                                var data =  $('#dataInserimentoEvento').val();
                                var dateAr = data.split(' ');
                                dateAr[1]= mese;
                                
                                var newDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];
                                
                                var nome = $('#nomeEvento').val();
                                var descrizione = $('#descrizioneEvento').val();
                                var campo = $('#selectCampoEvento').val();
                                
                                var json = {"nome":nome, "descrizione":descrizione, "data":newDate, "campo":campo};
                        
                                $.getJSON('scriptPHP/insertEvento.php',json,function(response){
                                    if(response){
                                        alert(response);
                                        $('#contentInserimentoEventi').hide();
                                    }
                                });
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
        $('#contentUpdateUtente').hide();
        $('#contentSquadra').show();
        $('#contentSquadraDinamic').empty();
        $('#contentSquadraDinamic').show();
        
        $.getJSON('scriptPHP/getUtenti.php',function(response) {
            if(response){
                var table = $('<table id="tbSquadra" class="responsive-table"></table>');
                $.each(response,function(k,v){
                    var row = $('<tr><td><a id="descUtente" href="" class="black-text" value="'+v['id']+'" onclick="funcUtente('+v['id']+');return false;"><h3>'+v['Nickname']+'</h3></a></td><td> '+v['Ruolo']+'</td><td> '+v['Stato']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                    table.append(row);
                });
                $('#contentSquadraDinamic').append(table);
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
        $('#contentCampoDinamic').show();
        $('#contentCampoDinamic').empty();
        $.getJSON('scriptPHP/getCampi.php',function(response) {
            if(response){
                var table = $('<table id="tbCampi" class="responsive-table"></table>');
                $.each(response,function(k,v){
                    var row = $('<tr><td class="bordo"><h3><a id="descCampo" href="" class="black-text" onclick="funcCampo('+v['idCampo']+');return false;">'+v['NomeCampo']+'</a></h3></td><td class="bordo"> '+v['Via']+'</td></tr>');
                    table.append(row);
                });
                $('#contentCampoDinamic').append(table);
            }
        });
    });
    
    $('#tue_asg').click(function() {
        $('#contentLogin').hide();
        $('#contentSignin').hide();
        $('#contentCampo').hide();
        $('#contentSquadra').hide();
        $('#contentDescEventi').hide();
        $('#contentUtenti').hide();
        $('#contentEventi').hide();
        $('#contentInserimentoASG').hide();
        $('#contentASG').show();
        $('#contentASGDinamic').show();
        $('#contentASGDinamic').empty();
        
        $.getJSON('scriptPHP/sessionWiew.php',function(response) {
            if (response) {
                var json = {"id":response};
                $.getJSON('scriptPHP/getASG.php',json,function(response) {
                    if(response){
                        var table = $('<table id="tbASG" class="responsive-table"></table>');
                        $.each(response,function(k,v){
                            var row = $('<tr><td><h3><a id="descASG" href="" class="black-text" onclick="funcASG('+v['idASG']+');return false;">'+v['Nome']+'</a></h3></td><td> '+v['Marca']+'</td><td> '+v['Potenza']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                            table.append(row);
                        });
                        $('#contentASGDinamic').append(table);
                    }
                });
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
                    
                    document.getElementById("nickSI").value = "";
                    document.getElementById("passSI").value = "";
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
        
        $('#inviaSignin').click(function() {
            var nick = $('#nickSU').val();
            var pass = $('#passSU').val();
            var email = $('#emailSU').val();
            var nome = $('#nomeSU').val();
            var cognome = $('#cognomeSU').val();
            var json = {"nick":nick, "pass":pass, "nome":nome, "cognome":cognome, "email":email};
            $.getJSON('scriptPHP/signup.php',json,function(response){
                if(response){
                    
                    var json = {"nick":response};
                    $.getJSON('scriptPHP/setSession.php',json,function(response){
                        if(response){
                            alert(response);
                        }
                    });
                    
                    $('#contentSignin').hide();
                    $('#btnLogout').show();
                    $('#tue_asg').show();
                    document.getElementById("nickSU").value = "";
                    document.getElementById("passSU").value = "";
                    document.getElementById("emailSU").value = "";
                    document.getElementById("nomeSU").value = "";
                    document.getElementById("cognomeSU").value = "";
                }
            });
        });
    });
});
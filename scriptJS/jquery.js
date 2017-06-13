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
                            
                            var json = {"id":a, "nome":nome, "descrizione":descrizione, "data":newDate, "campo":campo};
                    
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
            
            $('#btnPartecipa').click(function(){
                $.getJSON('scriptPHP/sessionWiew.php',function(response){
                    if(response){
                        var json = {"idEvento":a, "idUtente":response};
                        $.getJSON('scriptPHP/insertPartecipante.php',json,function(response) {
                            if(response){
                                alert(response);
                                
                                $('#contentEventiDinamic').empty();
                                $('#contentEventi').hide();
                            }
                        });
                        
                        var json2 = {"id":response};
                        $.getJSON('scriptPHP/getCountASG.php',json2,function(response){
                            if(response){
                                if (response == "show") {
                                    $('#contentASG').show();
                                    $('#contentUpgradeASGInsert').hide();
                                    $('#contentInserimentoASG').hide();
                                    $('#contentNoleggiaASG').hide();
                                    $('#contentPartecipaASG').show();
                                    
                                    $('#btnNoleggiaASG').click(function() {
                                        $('#contentPartecipaASG').hide();
                                        $('#contentASGDinamic').empty();
                                        $('#contentASGDinamic').show();
                                        
                                        $.getJSON('scriptPHP/getASGSquadra.php',function(response) {
                                            if(response){
                                                var table = $('<table id="tbASG" class="responsive-table"></table>');
                                                $.each(response,function(k,v){
                                                    var row = $('<tr><td><h3><a id="descASG" href="" class="black-text" onclick="funcNoleggia('+v['idASG']+');return false;">'+v['Nome']+'</a></h3></td><td> '+v['Marca']+'</td><td> '+v['Potenza']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                                                    table.append(row);
                                                });
                                                $('#contentASGDinamic').append(table);
                                            }
                                        });
                                    });
                                    
                                }
                                else{
                                    //$('#contentLoggato').show();
                                }
                            }
                        });
                    }
                });
            });
        }
    });
}

function funcNoleggia(a){
    $('#contentASGDinamic').hide();
    $('#contentNoleggiaASG').show();
    
    var json = {"id":a};
    
    $.getJSON('scriptPHP/getDescASG.php',json,function(response) {
        if(response){
            $('#tdNomeASGNoleggio').empty();
            $('#imgNoleggioASG').empty();
            $('#tdSelectMirinoASG').empty();
            
            $.each(response,function(k,v){
                var label = $('<h3>'+v['Nome']+'</h3>');
                $('#tdNomeASGNoleggio').append(label);
                
                var img = $('<img class="responsive-img imgRinchiusa" src="immagini/armi/'+v['Nome']+'.jpg">');
                $('#imgNoleggioASG').append(img);
                
                $.getJSON('scriptPHP/getMiriniASG.php',function(response) {
                    if(response){
                        var select = $('<select id="selectMirini" class="selectInitMirini"></select>');
                        $.each(response,function(k,v){
                            var row = $('<option value="'+v['id']+'" onmouseover="funcPopup(' + v['Descrizione'] + ');" onmouseout="funcPopup(0);">' + v['Nome'] + '</option>');
                            select.append(row);
                        });
                        $('#tdSelectMirinoASG').append(select);
                        
                        $(document).ready(function() {
                            $('.selectInitMirini').material_select();
                        });
                    }
                });
                
                $.getJSON('scriptPHP/getCaricatoriASG.php',function(response) {
                    if(response){
                        var select = $('<select id="selectCaricatori" class="selectInitCaricatori"></select>');
                        $.each(response,function(k,v){
                            var row = $('<option value="'+v['id']+'" onmouseover="funcPopup(' + v['Descrizione'] + ');" onmouseout="funcPopup(0);">' + v['Nome'] + '</option>');
                            select.append(row);
                        });
                        $('#tdSelectCaricatoreASG').append(select);
                        
                        $(document).ready(function() {
                            $('.selectInitCaricatori').material_select();
                            $('.collapsibleCaricatori').collapsible();
                        });
                    }
                });
                
                $.getJSON('scriptPHP/getCalciASG.php',function(response) {
                    if(response){
                        var select = $('<select id="selectCalci" class="selectInitCalci"></select>');
                        $.each(response,function(k,v){
                            var row = $('<option value="'+v['id']+'" onmouseover="funcPopup(' + v['Descrizione'] + ');" onmouseout="funcPopup(0);">' + v['Nome'] + '</option>');
                            select.append(row);
                        });
                        $('#tdSelectCalcioAnterioreASG').append(select);
                        
                        $(document).ready(function() {
                            $('.selectInitCalci').material_select();
                            $('.collapsibleCalci').collapsible();
                        });
                    }
                });
            });
        }
    });
}

function funcPopup(a){
    alert(a);
}

function funcUtente(a){
    $('#contentSquadraDinamic').empty();
    
    var json = {"descUtente":a};
    $.getJSON('scriptPHP/getDescUtenti.php',json,function(response) {
        if(response){
            var table = $('<table id="tbSquadra" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td><h3>'+v['Nickname']+'</h3></td><td> '+v['Ruolo']+'</td><td> '+v['Stato']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr><td colspan="3"><button id="btnModificaUtente" class="btn btn-primary">Modifica</button></td></tr>');
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
                $('#contentBtnModificaUtente').hide();
                $('#contentUpdateUtente').show();
                $('#nickUtenteSelezionato').empty();
                $('#selectRuoliUtente').empty();
                $('#selectPermessiUtente').empty();
                
                $('#colonnaSelectRuoli').empty();
                $('#colonnaSelectPermessi').empty();
                
                $.each(response,function(k,v){
                    var label = $('<div align="center"><h3>' + v['Nickname'] + '</h3></div>')
                    $('#nickUtenteSelezionato').append(label);
                    document.getElementById("descrizioneUtenteUpdate").innerHTML = v['Descrizione'];
                });
                
                $.getJSON('scriptPHP/getRuoli.php',function(response) {
                    if(response){
                        var select1 = $('<select id="selectRuoliUtente" class="selectInitRuoli"></select>');
                        $.each(response,function(k,v){
                            var row1 = $('<option value="'+v['id']+'" data-icon="immagini/ruoli/'+v['Ruolo']+'.png" class="left circle">'+v['Ruolo']+'</option>');
                            select1.append(row1);
                        });
                        $('#colonnaSelectRuoli').append(select1);
                        
                        $(document).ready(function() {
                            $('.selectInitRuoli').material_select();
                        });
                    }
                });
                
                $.getJSON('scriptPHP/getPermessi.php',function(response) {
                    if(response){
                        var select = $('<select id="selectPermessiUtente" class="selectInitPermessi"></select>');
                        $.each(response,function(k,v){
                            var row = $('<option value="'+v['idPermesso']+'">'+v['Stato']+'</option>');
                            select.append(row);
                        });
                        $('#colonnaSelectPermessi').append(select);
                        
                        $(document).ready(function() {
                            $('.selectInitPermessi').material_select();
                        });
                    }
                });
                
                $('#btnModificaPermessiUtente').click(function(){
                    var ruolo = $('#selectRuoliUtente').val();
                    var permesso = $('#selectPermessiUtente').val();
                    var desc = $('#descrizioneUtenteUpdate').val();
                    
                    var json = {"id":a, "ruolo":ruolo, "permesso":permesso, 'desc':desc};
                    
                    $.getJSON('scriptPHP/updateUtente.php',json,function(response){
                        if(response){
                            alert(response);
                            $('#contentUpdateUtente').hide();
                        }
                    });
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
                var row = $('<tr><td class="bordo"><h3>'+v['NomeCampo']+'</h3></td><td class="bordo"> '+v['Via']+'</td></tr><tr><td id="btnGestione" colspan="2"><iframe src="'+v['Mappa']+'" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe></td></tr><tr><td id="btnGestione" colspan="2"><button id="btnModificaCampo" class="btn btn-primary">Modifica</button></td></tr>');
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
    
    $.getJSON('scriptPHP/getDescASG.php',json,function(response) {
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

function funcLogin(){
    $('#contentBenvenuto').hide();
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
}

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
    
    $('#contentNonLoggato').hide();
    $('#contentLoggato').hide();
    $('#contentNonLoggatoSuccessiva').hide();
    
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
    
    $(".dropdown-button").dropdown({ hover: false });
    
    $.getJSON('scriptPHP/sessionWiew.php',function(response){
        if(response){
            if(response!="0"){
                $('#btnLogout').show();
                $('#tue_asg').show();
                $('#contentLoggato').show();
            }
            else if(response=="0"){
                $('#contentNonLoggato').show();
            }
        }
    });
    
    $('#home').click(function() {
        $('#contentEventi').hide();
        $('#contentLogin').hide();
        $('#contentSignin').hide();
        $('#contentASG').hide();
        $('#contentCampo').hide();
        $('#contentDescEventi').hide();
        $('#contentSquadra').hide();
        $('#contentUtenti').hide();
        $('#contentBenvenuto').show();
        
        $('#contentNonLoggato').hide();
        $('#contentLoggato').hide();
        $('#contentNonLoggatoSuccessiva').hide();
        
        $.getJSON('scriptPHP/sessionWiew.php',function(response){
            if(response){
                if(response!="null"){
                    $('#contentLoggato').show();
                }
                else{
                    $('#contentNonLoggatoSuccessiva').show();
                }
            }
        });
    });
    
    $('#eventi').click(function(){
        $('#btnInserisciEvento').hide();
        $('#contentInserimentoEventi').hide();
        
        $('#contentBenvenuto').hide();
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
        $('#contentBenvenuto').hide();
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
        $('#contentBenvenuto').hide();
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
                var table = $('<table id="tbCampi" class="responsive-table"><tr><td align="center">Nome campo</td><td align="center">Via</td><td align="center">Località</td></tr></table>');
                $.each(response,function(k,v){
                    var row = $('<tr><td class="bordo"><h3><a id="descCampo" href="" class="black-text" onclick="funcCampo('+v['idCampo']+');return false;">'+v['NomeCampo']+'</a></h3></td><td class="bordo"> '+v['Via']+'</td><td class="bordo"> '+v['Localita']+'</td></tr>');
                    table.append(row);
                });
                $('#contentCampoDinamic').append(table);
            }
        });
    });
    
    $('#tue_asg').click(function() {
        $('#contentBenvenuto').hide();
        $('#contentLogin').hide();
        $('#contentSignin').hide();
        $('#contentCampo').hide();
        $('#contentSquadra').hide();
        $('#contentDescEventi').hide();
        $('#contentUtenti').hide();
        $('#contentEventi').hide();
        $('#contentInserimentoASG').hide();
        $('#contentPartecipaASG').hide();
        $('#contentNoleggiaASG').hide();
        
        $('#btnInserisciASG').show();
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
        
        $('#btnInserisciASG').click(function() {
            $('#btnInserisciASG').hide();
            $('#contentASGDinamic').hide();
            $('#contentInserimentoASG').show();
            
            $('#btnInsertASG').click(function() {
                
                $.getJSON('scriptPHP/sessionWiew.php',function(response) {
                    if(response){
                        var nome = $('#nomeASG').val();
                        var marca = $('#marcaASG').val();
                        var potenza = $('#potenzaASG').val();
                        var descrizione = $('#descrizioneASG').val();
                        
                        var json = {"id":response,"nome":nome,"marca":marca,"potenza":potenza,"descrizione":descrizione};
                        $.getJSON('scriptPHP/insertASG.php',json,function(response) {
                            if(response){
                                alert(response);
                            }
                        });
                    }
                });
            });
        });
    });
    
    $('#btnLogin').click(function(){
        funcLogin();
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
        funcSignup()
    });
    
    $('#storia').click(function() {
        $('#contentEventi').hide();
        $('#contentLogin').hide();
        $('#contentSignin').hide();
        $('#contentASG').hide();
        $('#contentCampo').hide();
        $('#contentDescEventi').hide();
        $('#contentSquadra').hide();
        $('#contentUtenti').hide();
        $('#contentBenvenuto').show();
        
        $('#contentNonLoggato').hide();
        $('#contentLoggato').hide();
        $('#contentNonLoggatoSuccessiva').show();
    });
});
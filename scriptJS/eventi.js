function funcStat(){
    $.getJSON('scriptPHP/sessionWiew.php',function(response){
        if(response){
            
            var json = {'id':response};
            $.getJSON('scriptPHP/getStat.php',json,function(response){
                if(response){
                    $.each(response,function(k,v){
                        $('#imgUtenteLoggatoUnico').append('<div><img class="responsive-img imgRinchiusa" src="immagini/squadra/' + v['Nickname'] + '.jpg></div>');
                        $('#nPartiteGiocate').append('<p>' + v['NumeroPartite'] + '</p>');
                        $('#nPartiteVinte').append('<p>' + v['NumeroVittorie'] + '</p>');
                        $('#nPartitePerse').append('<p>' + v['NumeroSconfitte'] + '</p>');
                        $('#KDRatio').append('<p>' + v['KDRatio'] + '</p>');
                        $('#uccisioni').append('<p>' + v['Uccisioni'] + '</p>');
                        $('#morti').append('<p>' + v['Morti'] + '</p>');
                        $('#percentualeVinte').append('<p>' + v['NVittorie'] + '</p>');
                    });
                }
            });
        }
    });
    
    $.getJSON('scriptPHP/getRank.php',function(response){
        if(response){
            var intest = ('<tr class="bordo"><td>Nick</td><td>Gio.</td><td>W</td><td>L</td><td>% W</td><td>Kill</td><td>Death</td><td>K/D Ratio</td></tr>');
            $('#tbClassifica').append(intest);
            $.each(response,function(k,v){
                var row = ('<tr><td>' + v['Nickname'] + '</td><td>' + v['NumeroPartite'] + '</td><td>' + v['NumeroVittorie'] + '</td><td>' + v['NumeroSconfitte'] + '</td><td>' + v['NVittorie'] + '</td><td>' + v['Uccisioni'] + '</td><td>' + v['Morti'] + '</td><td>' + v['KDRatio'] + '</td></tr>');
                $('#tbClassifica').append(row);
            });
        }
    });
}

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
                var row = $('<tr><td><h3><span id="font">'+v['Nome']+'</span></h3></td><td> '+newDate+'</td></tr><tr><td colspan="2" class="bordo">'+v['Descrizione']+'</td></tr><tr><td id="btnGestione" colspan="2"><button id="btnPartecipa" class="btn btn-primary">Partecipa</button></td></tr><tr><td id="btnGestione" colspan="2"><button id="btnModificaEvento" class="btn btn-primary">Modifica</button></td></tr><tr><td colspan="2" class=""><button id="btnEliminaEvento" class="btn btn-primary" onclick="funcEliminaEvento('+v['id']+')">ELIMINA EVENTO</button></td></tr>');
                table.append(row);
            });
            
            $('#contentEventiDinamic').append(table);
            
            $('#btnModificaEvento').hide();
            $('#btnPartecipa').hide();
            $('#btnEliminaEvento').hide();
            
            $.getJSON('scriptPHP/eventoPermisWiew.php',function(response) {
                if(response){
                    if(response=='show'){
                        $('#btnModificaEvento').show();
                        $('#btnEliminaEvento').show();
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
            
            $('#btnModificaEvento').unbind().click(function() {
                $('#btnInserisciEvento').hide();
                $('#contentInserimentoEventi').show();
                $('#contentSelectCampoEventi').empty();
                $('#contentEventiDinamic').empty();
                
                $.getJSON('scriptPHP/getCampi.php',function(response) {
                        if(response){
                            var select = $('<select id="selectCampoEvento" class="selectInitCampi"></select>');
                            $.each(response,function(k,v){
                                var row = $('<option value="'+v['idCampo']+'">'+v['NomeCampo']+'</option>');
                                select.append(row);
                            });
                            $('#contentSelectCampoEventi').append(select);
                            
                            $(document).ready(function() {
                                $('.selectInitCampi').material_select();
                            });
                        }
                    });
                
                var button = $('<button type="button" class="btn btn-primary navbar-btn" id="modificaEvento">MODIFICA</button>')
                $('#btnEventoInserisciModifica').empty();
                $('#btnEventoInserisciModifica').append(button);
                
                $('#modificaEvento').unbind().click(function(){
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
                                    $('#contentBenvenuto').show();
                                    
                                    funcStat();
        
                                    $('#contentNonLoggato').hide();
                                    $('#contentLoggato').show();
                                    $('#contentNotizie').hide();
                                    $('#contentUltimoPassaggio').hide();
                                    $('#contentNonLoggatoSuccessiva').hide();
                                }
                            });
                        }
                    });
                });
            });
            
            $('#btnPartecipa').unbind().click(function(){
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
                                    
                                    $('#btnNoleggiaASG').unbind().click(function() {
                                        $('#contentPartecipaASG').hide();
                                        $('#contentASGDinamic').empty();
                                        $('#contentASGDinamic').show();
                                        
                                        $.getJSON('scriptPHP/getASGSquadra.php',function(response) {
                                            if(response){
                                                var table = $('<table id="tbASG" class="responsive-table"></table>');
                                                $.each(response,function(k,v){
                                                    var row = $('<tr><td><h3><a id="descASG" href="" class="black-text" onclick="funcNoleggia('+ v['idASG'] +', ' + a + ');return false;">'+v['Nome']+'</a></h3></td><td> '+v['Marca']+'</td><td> '+v['Potenza']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                                                    table.append(row);
                                                });
                                                $('#contentASGDinamic').append(table);
                                            }
                                        });
                                    });
                                    
                                }
                                else{
                                    $('#contentLoggato').show();
                                }
                            }
                        });
                    }
                });
            });
        }
    });
}

function funcEliminaEvento(a){
    var json = {"id":a};
    
    $.getJSON('scriptPHP/deleteEvento.php',json,function(response){
        if(response){
            alert(response);
            $('#contentEventi').hide();
            $('#contentBenvenuto').show();
            
            funcStat();

            $('#contentNonLoggato').hide();
            $('#contentLoggato').show();
            $('#contentNotizie').hide();
            $('#contentUltimoPassaggio').hide();
            $('#contentNonLoggatoSuccessiva').hide();
        }
    });
}

function funcNoleggia(a,b){
    $('#contentASGDinamic').hide();
    $('#contentNoleggiaASG').show();
    
    var json = {"id":a};
    
    $.getJSON('scriptPHP/getDescASG.php',json,function(response) {
        if(response){
            $('#tdNomeASGNoleggio').empty();
            $('#imgNoleggioASG').empty();
            $('#tdSelectMirinoASG').empty();
            
            $.each(response,function(k,v){
                var label = $('<h3><span id="font">'+v['Nome']+'</span></h3>');
                $('#tdNomeASGNoleggio').append(label);
                
                var img = $('<img class="responsive-img imgRinchiusa" src="immagini/armi/'+v['Nome']+'.jpg">');
                $('#imgNoleggioASG').append(img);
                
                $.getJSON('scriptPHP/getMiriniASG.php',function(response) {
                    if(response){
                        $('#tdSelectMirinoASG').empty();
                        var select = $('<select id="selectMirini" class="selectInitMirini"></select>');
                        $.each(response,function(k,v){
                            var row = $('<option value="'+v['id']+'">' + v['Nome'] + '</option>');
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
                        $('#tdSelectCaricatoreASG').empty();
                        var select = $('<select id="selectCaricatori" class="selectInitCaricatori"></select>');
                        $.each(response,function(k,v){
                            var row = $('<option value="'+v['id']+'">' + v['Nome'] + '</option>');
                            select.append(row);
                        });
                        $('#tdSelectCaricatoreASG').append(select);
                        
                        $(document).ready(function() {
                            $('.selectInitCaricatori').material_select();
                        });
                    }
                });
                
                $.getJSON('scriptPHP/getCalciASG.php',function(response) {
                    if(response){
                        $('#tdSelectCalcioAnterioreASG').empty();
                        var select = $('<select id="selectCalci" class="selectInitCalci"></select>');
                        $.each(response,function(k,v){
                            var row = $('<option value="'+v['id']+'">' + v['Nome'] + '</option>');
                            select.append(row);
                        });
                        $('#tdSelectCalcioAnterioreASG').append(select);
                        
                        $(document).ready(function() {
                            $('.selectInitCalci').material_select();
                        });
                    }
                });
                
                $('#btnPrenotaASG').unbind().click(function(){
                    $.getJSON('scriptPHP/sessionWiew.php',function(response){
                        if(response){
                            
                            var json = {"idUtente":response,"idASG":a,"idEvento":b};
                            $.getJSON('scriptPHP/insertNoleggio.php',json,function(response){
                                if(response){
                                    if(response != null){
                                        var caric = $('#selectCaricatori').val();
                                        var mirino = $('#selectMirini').val();
                                        var calcio = $('#selectCalci').val();
                                        
                                        var json = {"idUtente":response,"idASG":a,"idEvento":b,"caric":caric,"mirino":mirino,"calcio":calcio};
                                        $.getJSON('scriptPHP/insertNoleggioUpgrade.php',json,function(response){
                                            if(response){
                                                alert(response);
                                                $('#contentASG').hide();
                                                $('#contentBenvenuto').show();
                                                
                                                funcStat();
                    
                                                $('#contentNonLoggato').hide();
                                                $('#contentLoggato').hide();
                                                $('#contentUltimoPassaggio').hide();
                                                $('#contentNonLoggatoSuccessiva').show();
                                            }
                                        });
                                    }
                                    else{
                                        alert('Errore!!');
                                    }
                                }
                            });
                        }
                    });
                });
            });
        }
    });
}

$(document).ready(function(){
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
                    var row = $('<tr><td><h3><a id="descEvento" href="" class="black-text" onclick="funcEvento('+v['id']+');return false;"><span id="font">'+v['Nome']+'</span></a></h3></td><td> '+newDate+'</td></tr><tr><td colspan="2"><h5><a id="descEvento" href="" class="black-text" onclick="funcCampo('+v['idCampo']+');return false;">'+v['NomeCampo']+'</a></h5></td></tr><tr><td colspan="2" class="bordo">'+v['Descrizione']+'</td></tr>');
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
            }
        });
        $('#btnInserisciEvento').unbind().click(function() {
            $('#contentEventiDinamic').hide();
            $('#btnInserisciEvento').hide();
            $('#contentInserimentoEventi').show();
            $('#contentSelectCampoEventi').empty();
            
            document.getElementById("dataInserimentoEvento").value = "";
            document.getElementById("nomeEvento").value = "";
            document.getElementById("descrizioneEvento").value = "";
            $('#selectCampoEvento').empty();
            
            $.getJSON('scriptPHP/getCampi.php',function(response) {
                if(response){
                    var select = $('<select id="selectCampoEvento" class="selectInitCampi"></select>');
                    $.each(response,function(k,v){
                        var row = $('<option value="'+v['idCampo']+'">'+v['NomeCampo']+'</option>');
                        select.append(row);
                    });
                    $('#contentSelectCampoEventi').append(select);
                    
                    $(document).ready(function() {
                        $('.selectInitCampi').material_select();
                    });
                }
            });
            
            var button = $('<button type="button" class="btn btn-primary navbar-btn" id="inserisciEvento">INSERISCI</button>')
            $('#btnEventoInserisciModifica').empty();
            $('#btnEventoInserisciModifica').append(button);
            
            $('#inserisciEvento').unbind().click(function() {
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
                                $('#contentBenvenuto').show();
                                
                                funcStat();

                                $('#contentNonLoggato').hide();
                                $('#contentLoggato').show();
                                $('#contentNotizie').hide();
                                $('#contentUltimoPassaggio').hide();
                                $('#contentNonLoggatoSuccessiva').hide();
                            }
                        });
                    }
                }); 
            });
        });
    });
});
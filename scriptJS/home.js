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

function funcNotizia(a){
    $('#contentNotizieDinamic').empty();
    $('#contentNotizieDinamic').hide();
    
    var json = {"descNot":a};
    $.getJSON('scriptPHP/getDescNotizie.php',json,function(response) {
        if(response){
            var table = $('<table id="tbNotizie" class="responsive-table"></table');
            $.each(response,function(k,v){
                var data =  v['Data'];
                var dateAr = data.split('-');
                var dateAbcd = dateAr[2].split(' ');
                var newDate = dateAbcd[0] + '/' + dateAr[1] + '/' + dateAr[0];
                var row = $('<tr><td><a id="descEvento" href="" class="black-text" onclick="funcNotizia('+v['idNotizia']+');return false;"><span id="font"><h2>' + v['Titolo'] + '</h2></span></a></td><td>' + newDate + '</td></tr><tr><td colspan="2">' + v['Contenuto'] + '</td></tr><tr><td id="btnGestione" colspan="2"><button id="btnModificaNotizia" class="btn btn-primary">Modifica</button></td></tr><tr><td colspan="2" class=""><button id="btnEliminaNotizia" class="btn btn-primary">ELIMINA</button></td></tr>');
                table.append(row);
            });
            $('#contentNotizieDinamic').append(table);
            
            $('#btnModificaNotizia').hide();
            $('#btnEliminaNotizia').hide();
            $('#contentNotizieDinamic').show();
            
            $.getJSON('scriptPHP/eventoPermisWiew.php',function(response) {
                if(response){
                    if(response=='show'){
                        $('#btnModificaNotizia').show();
                        $('#btnEliminaNotizia').show();
                    }
                }
            });
            
            $('#btnModificaNotizia').unbind().click(function() {
                $('#btnInserisciNotizia').hide();
                $('#contentNotizieDinamic').hide();
                $('#contentInserimentoNotizia').show();
                
                document.getElementById("titoloNotizia").value = "";
                document.getElementById("descrizioneNotizia").value = "";
                
                var button = $('<button type="button" class="btn btn-primary navbar-btn" id="modificaNotizia">MODIFICA</button>')
                $('#btnNotiziaInserisciModifica').empty();
                $('#btnNotiziaInserisciModifica').append(button);
                
                $('#modificaNotizia').unbind().click(function(){
                    var nome = $('#titoloNotizia').val();
                    var descrizione = $('#descrizioneNotizia').val();
                    
                    var json = {"id":a, "nome":nome, "descrizione":descrizione};
            
                    $.getJSON('scriptPHP/updateNotizia.php',json,function(response){
                        if(response){
                            alert(response);
                            $('#contentInserimentoNotizia').hide();
                            $('#contentBenvenuto').show();
                            
                            funcStat();

                            $('#contentNonLoggato').hide();
                            $('#contentLoggato').show();
                            $('#contentNotizie').hide();
                            $('#contentUltimoPassaggio').hide();
                            $('#contentNonLoggatoSuccessiva').hide();
                        }
                    });
                });
            });
            
            $('#btnEliminaNotizia').unbind().click(function() {
                var json = {"id":a};
    
                $.getJSON('scriptPHP/deleteNotizia.php',json,function(response){
                    if(response){
                        alert(response);
                        $('#contentNotizie').hide();
                        $('#contentBenvenuto').show();
                        
                        funcStat();
            
                        $('#contentNonLoggato').hide();
                        $('#contentLoggato').show();
                        $('#contentNotizie').hide();
                        $('#contentUltimoPassaggio').hide();
                        $('#contentNonLoggatoSuccessiva').hide();
                    }
                });
            });
        }
    });
}

$(document).ready(function(){
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
        
        $('#contentNotizieDinamic').empty();
        $('#contentInserimentoNotizia').hide();
        $('#btnInserisciNotizia').hide();
        
        $.getJSON('scriptPHP/eventoPermisWiew.php',function(response) {
            if(response){
                if(response=='show'){
                    $('#btnInserisciNotizia').show();
                }
            }
        });
        
        $('#contentNonLoggato').hide();
        $('#contentLoggato').hide();
        $('#contentUltimoPassaggio').hide();
        $('#contentNonLoggatoSuccessiva').hide();
        $('#contentNotizie').show();
        
        $('#contentNotizieDinamic').show();
        
        $.getJSON('scriptPHP/getNotizie.php',function(response){
            if(response){
                var table = $('<table id="tbNotizie" class="responsive-table"></table');
                $.each(response,function(k,v){
                    var data =  v['Data'];
                    var dateAr = data.split('-');
                    var dateAbcd = dateAr[2].split(' ');
                    var newDate = dateAbcd[0] + '/' + dateAr[1] + '/' + dateAr[0];
                    var row = $('<tr><td><a id="descEvento" href="" class="black-text" onclick="funcNotizia('+v['idNotizia']+');return false;"><span id="font"><h2>' + v['Titolo'] + '</h2></span></a></td><td>' + newDate + '</td></tr><tr><td colspan="2">' + v['Contenuto'] + '</td></tr>');
                    table.append(row);
                });
                $('#contentNotizieDinamic').append(table);
            }
        });
        
        $('#btnInserisciNotizia').unbind().click(function(){
            $('#contentNotizieDinamic').hide();
            $('#contentInserimentoNotizia').show();
            $('#btnInserisciNotizia').hide();
            
            document.getElementById("titoloNotizia").value = "";
            document.getElementById("descrizioneNotizia").value = "";
            
            var button = $('<button type="button" class="btn btn-primary navbar-btn" id="inserisciNotizia">INSERISCI</button>')
            $('#btnNotiziaInserisciModifica').empty();
            $('#btnNotiziaInserisciModifica').append(button);
            
            $('#inserisciNotizia').unbind().click(function(){
                var tit = $('#titoloNotizia').val();
                var desc = $('#descrizioneNotizia').val();
                
                var json = {"tit":tit,"desc":desc};
                $.getJSON('scriptPHP/insertNotizia.php',json,function(response){
                    if(response){
                        alert(response);
                        $('#contentInserimentoNotizia').hide();
                        $('#contentBenvenuto').show();
                        
                        funcStat();

                        $('#contentNonLoggato').hide();
                        $('#contentNotizie').hide();
                        $('#contentUltimoPassaggio').hide();
                        $('#contentNonLoggatoSuccessiva').hide();
                        $('#contentLoggato').show();
                    }
                });
            });
        });
    });
});
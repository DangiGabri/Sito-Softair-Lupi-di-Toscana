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

function funcUtente(a){
    $('#contentSquadraDinamic').empty();
    
    var json = {"descUtente":a};
    $.getJSON('scriptPHP/getDescUtenti.php',json,function(response) {
        if(response){
            var table = $('<table id="tbSquadra" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td><h3><span id="font">'+v['Nickname']+'</span></h3></td><td> '+v['Ruolo']+'</td><td> '+v['Stato']+'</td></tr><tr><td colspan="3"><img class="responsive-img imgRinchiusa" src="immagini/squadra/'+v['Nickname']+'.jpg"></td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr><td colspan="3"><button id="btnModificaUtente" class="btn btn-primary">Modifica</button></td></tr>');
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
            
            $('#btnModificaUtente').unbind().click(function() {
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
                
                $('#btnModificaPermessiUtente').unbind().click(function(){
                    var ruolo = $('#selectRuoliUtente').val();
                    var permesso = $('#selectPermessiUtente').val();
                    var desc = $('#descrizioneUtenteUpdate').val();
                    
                    var json = {"id":a, "ruolo":ruolo, "permesso":permesso, 'desc':desc};
                    
                    $.getJSON('scriptPHP/updateUtente.php',json,function(response){
                        if(response){
                            alert(response);
                            $('#contentUpdateUtente').hide();
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
            
        }
    });
}

$(document).ready(function(){
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
                    var row = $('<tr><td><a id="descUtente" href="" class="black-text" value="'+v['id']+'" onclick="funcUtente('+v['id']+');return false;"><h3><span id="font">'+v['Nickname']+'</span></h3></a></td><td> '+v['Ruolo']+'</td><td> '+v['Stato']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                    table.append(row);
                });
                $('#contentSquadraDinamic').append(table);
            }
        });
    });
});
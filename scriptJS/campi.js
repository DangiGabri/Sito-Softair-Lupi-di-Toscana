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

function funcCampo(a){
    $('#contentCampoDinamic').show();
    $('#contentCampoDinamic').empty();
    
    var json = {"descCampo":a};
    
    $.getJSON('scriptPHP/getDescCampi.php',json,function(response) {
        if(response){
            var table = $('<table id="tbCampi" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td class="bordo"><h3><span id="font">'+v['NomeCampo']+'</span></h3></td><td class="bordo"> '+v['Via']+'</td><td class="bordo"> '+v['Localita']+'</td></tr><tr><td id="btnGestione" colspan="3"><iframe src="'+v['Mappa']+'" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe></td></tr><tr><td id="btnGestione" colspan="3"><button id="btnModificaCampo" class="btn btn-primary">Modifica campo</button></td></tr><tr><td id="btnGestione" colspan="3"><button id="btnEliminaCampo" class="btn btn-primary">Elimina campo</button></td></tr>');
                table.append(row);
            });
            $('#contentCampoDinamic').append(table);
            
            $('#btnModificaCampo').hide();
            $('#btnEliminaCampo').hide();
            
            $.getJSON('scriptPHP/utentePermisWiew.php',function(response) {
                if(response){
                    if(response=='show'){
                        $('#btnModificaCampo').show();
                        $('#btnEliminaCampo').show();
                    }
                }
            });
            
            $('#btnModificaCampo').unbind().click(function(){
                $('#contentCampoDinamic').hide();
                $('#divMappaCampoI').hide();
                $('#contentInsertCampo').show();
                
                var button = $('<button id="btnUpdateCampo" class="btn btn-primary">Modiica CAMPO</button>')
                $('#contentBtnInserisciCampo').empty();
                $('#contentBtnInserisciCampo').append(button);
                
                document.getElementById("nomeCampoI").value = "";
                document.getElementById("localitaCampoI").value = "";
                document.getElementById("viaCampoI").value = "";
                
                $.each(response,function(k,v){
                    document.getElementById("nomeCampoI").innerHTML = v['NomeCampo'];
                    document.getElementById("localitaCampoI").innerHTML = v['Localita'];
                    document.getElementById("viaCampoI").innerHTML = v['Via'];
                });
                
                $('#btnUpdateASG').unbind().click(function(){
                    var nome = $('#nomeCampoI').val();
                    var localita = $('#localitaCampoI').val();
                    var via = $('#viaCampoI').val();
                    
                    var json = {"id":a, "nome":nome, "localita":localita, "via":via};
                    
                    $.getJSON('scriptPHP/updateCampo.php',json,function(response) {
                        if(response){
                            alert(response);
                            $('#contentCampo').hide();
                            $('#contentBenvenuto').show();
                            
                            funcStat();
    
                            $('#contentNonLoggato').hide();
                            $('#contentLoggato').show();
                            $('#contentUltimoPassaggio').hide();
                            $('#contentNotizie').hide();
                            $('#contentNonLoggatoSuccessiva').hide();
                        }
                    });
                });
            });
            
            $('#btnEliminaCampo').unbind().click(function(){
                var json = {"id":a};
                
                $.getJSON('scriptPHP/deleteCampo.php',json,function(response) {
                    if(response){
                        alert(response);
                        $('#contentCampo').hide();
                        $('#contentBenvenuto').show();
                        
                        funcStat();

                        $('#contentNonLoggato').hide();
                        $('#contentLoggato').show();
                        $('#contentUltimoPassaggio').hide();
                        $('#contentNotizie').hide();
                        $('#contentNonLoggatoSuccessiva').hide();
                    }
                });
            });
        }
    });
}

$(document).ready(function(){
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
        
        $('#btnInserisciCampo').hide();
        $('#contentUpdateCampo').hide();
        $('#contentInsertCampo').hide();
        $('#contentCampoDinamic').show();
        $('#contentCampoDinamic').empty();
        $.getJSON('scriptPHP/getCampi.php',function(response) {
            if(response){
                var table = $('<table id="tbCampi" class="responsive-table"><tr><td align="center">Nome campo</td><td align="center">Via</td><td align="center">Località</td></tr></table>');
                $.each(response,function(k,v){
                    var row = $('<tr><td class="bordo"><h3><a id="descCampo" href="" class="black-text" onclick="funcCampo('+v['idCampo']+');return false;"><span id="font">'+v['NomeCampo']+'</span></a></h3></td><td class="bordo"> '+v['Via']+'</td><td class="bordo"> '+v['Localita']+'</td></tr>');
                    table.append(row);
                });
                $('#contentCampoDinamic').append(table);
            }
        });
        
        $('#btnInserisciCampo').hide();
        
        $.getJSON('scriptPHP/utentePermisWiew.php',function(response) {
            if(response){
                if(response=='show'){
                    $('#btnInserisciCampo').show();
                }
            }
        });
        
        $('#btnInserisciCampo').unbind().click(function() {
            $('#btnInserisciCampo').hide();
            $('#contentUpdateCampo').hide();
            $('#contentCampoDinamic').hide();
            $('#contentInsertCampo').show();
            $('#divMappaCampoI').show();
            
            var button = $('<button id="btnInseritCampo" class="btn btn-primary">INSERISCI CAMPO</button>')
            $('#contentBtnInserisciCampo').empty();
            $('#contentBtnInserisciCampo').append(button);
            
            document.getElementById("nomeCampoI").value = "";
            document.getElementById("viaCampoI").value = "";
            document.getElementById("localitaCampoI").value = "";
            document.getElementById("mappaCampoI").value = "";
            
            $('#btnInseritCampo').unbind().click(function() {
                var nome = $('#nomeCampoI').val();
                var via = $('#viaCampoI').val();
                var loc = $('#localitaCampoI').val();
                var map = $('#mappaCampoI').val();
                
                var json = {"nome":nome,"via":via,"loc":loc,"map":map};
                $.getJSON('scriptPHP/insertCampo.php',json,function(response) {
                    if(response){
                        alert(response);
                        $('#contentCampo').hide();
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
    });
});
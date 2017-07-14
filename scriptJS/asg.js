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

function funcASG(a){
    $('#contentASGDinamic').empty();
    
    var json = {"id":a};
    
    $.getJSON('scriptPHP/getDescASG.php',json,function(response) {
        if(response){
            var table = $('<table id="tbDescASG" class="responsive-table"></table>');
            $.each(response,function(k,v){
                var row = $('<tr><td><h3><span id="font">'+v['Nome']+'</span></h3></td><td>Marca: '+v['Marca']+'</td><td>Potenza: '+v['Potenza']+'</td></tr><tr><td colspan="3"><img class="responsive-img imgRinchiusa" src="immagini/armi/'+v['Nome']+'.jpg"></td></tr><tr><td colspan="3">'+v['Descrizione']+'</td></tr><tr><td colspan="3"><button id="btnModificaASG" class="btn btn-primary">MODIFICA ARMA</button></td></tr><tr><td colspan="3" class="bordo"><button id="btnEliminaASG" class="btn btn-primary">ELIMINA ARMA</button></td></tr>');
                table.append(row);
            });
            $('#contentASGDinamic').append(table);
            
            $('#btnModificaASG').unbind().click(function(){
                $('#contentASGDinamic').hide();
                $('#contentInserimentoASG').show();
                
                var button = $('<button id="btnUpdateASG" class="btn btn-primary">Modifica ARMA</button>')
                $('#divBtnAggiungiASG').empty();
                $('#divBtnAggiungiASG').append(button);
                
                document.getElementById("nomeASG").value = "";
                document.getElementById("marcaASG").value = "";
                document.getElementById("descrizioneASG").value = "";
                document.getElementById("potenzaASG").value = "";
                
                $.each(response,function(k,v){
                    document.getElementById("nomeASG").innerHTML = v['Nome'];
                    document.getElementById("marcaASG").innerHTML = v['Marca'];
                    document.getElementById("descrizioneASG").innerHTML = v['Descrizione'];
                    document.getElementById("potenzaASG").innerHTML = v['Potenza'];
                });
                
                $('#btnUpdateASG').unbind().click(function(){
                    var nome = $('#nomeASG').val();
                    var marca = $('#marcaASG').val();
                    var potenza = $('#potenzaASG').val();
                    var desc = $('#descrizioneASG').val();
                    
                    var json = {"id":a, "nome":nome, "marca":marca, "potenza":potenza, "desc":desc};
                    
                    $.getJSON('scriptPHP/updateASG.php',json,function(response) {
                        if(response){
                            alert(response);
                            $('#contentASG').hide();
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
            
            $('#btnEliminaASG').unbind().click(function(){
                var json = {"id":a};
                
                $.getJSON('scriptPHP/deleteASG.php',json,function(response) {
                    if(response){
                        alert(response);
                        $('#contentASG').hide();
                        $('#contentBenvenuto').show();
                        
                        funcStat();

                        $('#contentNonLoggato').hide();
                        $('#contentLoggato').show();
                        $('#contentConfermaUtente').hide();
                        $('#contentNotizie').hide();
                        $('#contentNonLoggatoSuccessiva').hide();
                    }
                });
            });
        }
    });
}

$(document).ready(function(){
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
                            var row = $('<tr><td><h3><a id="descASG" href="" class="black-text" onclick="funcASG('+v['idASG']+');return false;"><span id="font">'+v['Nome']+'</span></a></h3></td><td> '+v['Marca']+'</td><td> '+v['Potenza']+'</td></tr><tr><td colspan="3" class="bordo">'+v['Descrizione']+'</td></tr>');
                            table.append(row);
                        });
                        $('#contentASGDinamic').append(table);
                    }
                });
            }
        });
        
        $('#btnInserisciASG').unbind().click(function() {
            $('#btnInserisciASG').hide();
            $('#contentASGDinamic').hide();
            $('#contentInserimentoASG').show();
            
            document.getElementById("nomeASG").value = "";
            document.getElementById("marcaASG").value = "";
            document.getElementById("potenzaASG").value = "";
            document.getElementById("descrizioneASG").value = "";
            
            var button = $('<button id="btnInsertASG" class="btn btn-primary">INSERISCI ARMA</button>')
            $('#divBtnAggiungiASG').empty();
            $('#divBtnAggiungiASG').append(button);
            
            $('#btnInsertASG').unbind().click(function() {
                
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
                                $('#contentASG').hide();
                                $('#contentBenvenuto').show();
                                
                                funcStat();
        
                                $('#contentNonLoggato').hide();
                                $('#contentLoggato').show();
                                $('#contentUltimoPassaggio').hide();
                                $('#contentNotizie').hide();
                                $('#contentNonLoggatoSuccessiva').hide();
                            }
                        });
                    }
                });
            });
        });
    });
});
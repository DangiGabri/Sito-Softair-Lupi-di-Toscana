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
    
    $('#inviaLogin').unbind().click(function() {
        
        var nick = $('#nickSI').val();
        var pass = $('#passSI').val();
        var json = {"nick":nick, "pass":pass};
        $.getJSON('scriptPHP/login.php',json,function(response){
            if(response){
                alert(response);
                if(response=='Login avvenuto.'){
                    $('#contentLogin').hide();
                    
                    $('#btnLogout').show();
                    $('#tue_asg').show();
                    $('#stat').show();
                    
                    document.getElementById("nickSI").value = "";
                    document.getElementById("passSI").value = "";
                    
                    $('#contentBenvenuto').show();
                    
                    funcStat();
            
                    $('#contentNonLoggato').hide();
                    $('#contentLoggato').show();
                    $('#contentNotizie').hide();
                    $('#contentUltimoPassaggio').hide();
                    $('#contentNonLoggatoSuccessiva').hide();
                }
            }
        });
    });
}

$(document).ready(function(){
    $('#btnLogin').click(function(){
        funcLogin();
    });
});
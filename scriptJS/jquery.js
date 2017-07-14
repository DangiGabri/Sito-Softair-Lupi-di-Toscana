$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $('#contentLogin').hide();
    $('#contentSignin').hide();
    $('#contentASG').hide();
    $('#contentCampo').hide();
    $('#contentSquadra').hide();
    $('#contentUtenti').hide();
    $('#contentEventi').hide();
    
    $('#btnLogout').hide();
    $('#tue_asg').hide();
    $('#stat').hide();
    
    $('#contentNonLoggato').show();
    $('#contentLoggato').hide();
    $('#contentNonLoggatoSuccessiva').hide();
    $('#contentUltimoPassaggio').hide();
    $('#contentNotizie').hide();
    
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
    
    $(".dropdown-button").dropdown({ hover: false });
    
    $.getJSON('scriptPHP/sessionWiew.php',function(response){
        if(response){
            if(response!="0" || response!="null"){
                $('#contentNonLoggato').hide();
                $('#contentInserimentoNotizia').hide();
                $('#btnInserisciNotizia').hide();
                
                $.getJSON('scriptPHP/eventoPermisWiew.php',function(response) {
                    if(response){
                        if(response=='show'){
                            $('#btnInserisciNotizia').show();
                        }
                    }
                });
                
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
                
                $('#btnLogout').show();
                $('#tue_asg').show();
                $('#stat').show();
                
                $('#contentBenvenuto').show();
                $('#contentNotizie').show();
            }
        }
    });
    
    var navHeight = $('#nav').outerHeight();
	$(window).scroll(function(){
		if ($(window).scrollTop() > navHeight){
			$('#nav').addClass('fixed');
			$('#content').css('padding-top', navHeight+'px'); 
		}else{
			$('#nav').removeClass('fixed');
			$('#content').css('padding-top', '0'); 
		}
	});
});
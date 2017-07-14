$(document).ready(function(){
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
        $('#contentNotizie').hide();
        $('#contentUltimoPassaggio').hide();
        $('#contentNonLoggatoSuccessiva').show();
    });
});
function init_explora() {
    querys = [ ["class:Person"], ['Year:[1990 TO '+new Date().getFullYear() + '],class:FrameActivity'], ["ObjectType:Collection"]];
    $(".explorar_classe").each(function (i, item){
        $(item).attr('rel', querys[i]);
    });
    $('#zona_resultats').html('<img class="spinner_zona_resultats" src="spinner.gif" />');

    querystring = {rows: 999999, s: '', conf: 'Agents', f: querys[0]};

    parametres_visualitzacio = {querystring: querystring, visualitzacio: 'columnes', zoom: '1', pagina_actual: 1, resultats_per_pagina: 15};

    //('#visual-portal-wrapper').get(0) = objecte dom sense envolcall jquery
    $('#visual-portal-wrapper').get(0).parametres_visualitzacio = parametres_visualitzacio;

    parametres_visualitzacio_json = JSON.stringify(parametres_visualitzacio);

    $.post('resultatsView', {parametres_visualitzacio: parametres_visualitzacio_json}, function(data){
        $('div#zona_resultats').replaceWith(data);
        $('div#controls_resultats').css('display','none');
        $('div#ordre_y_tipus_cerca').css('display','none');
        $('#resultats_cerca').removeClass();
    }).error(function(){ genericAjaxError($('div#zona_resultats'));});

    $('.explorar_classe').click(function(event) {

        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();

        $('.explorar_classe.selected').removeClass('selected');
        $(this).addClass('selected');

        $('#zona_resultats').html('<img class="spinner_zona_resultats" src="spinner.gif" />');

        querystring = {rows: 999999, s: '', conf: $(this).attr('data-conf'), f: [$(this).attr('rel')]};
        visualitzacio = 'fitxa_cerca';
        if ( $(this).attr('rel') != 'ObjectType:Collection'){
            visualitzacio = 'columnes';
        }
        parametres_visualitzacio = {querystring: querystring, visualitzacio: visualitzacio, zoom: '1', pagina_actual: 1, resultats_per_pagina: 15};

        //('#visual-portal-wrapper').get(0) = objecte dom sense envolcall jquery
        $('#visual-portal-wrapper').get(0).parametres_visualitzacio = parametres_visualitzacio;

        parametres_visualitzacio_json = JSON.stringify(parametres_visualitzacio);

        $.post('resultatsView', {parametres_visualitzacio: parametres_visualitzacio_json}, function(data){
            $('div#zona_resultats').replaceWith(data);
            if (visualitzacio == 'columnes') {
                $('div#controls_resultats').css('display','none');
            }
            $('div#ordre_y_tipus_cerca').css('display','none');
            $('#resultats_cerca').removeClass();
        }).error(function(){ genericAjaxError($('div#zona_resultats'));});

    });
}
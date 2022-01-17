function() {

    var pathname = '';
    var order = [];

    pathname = getPath();

    // Assign handlers immediately after making the request,
    // and remember the jqxhr object for this request
    if ((window.location.pathname.indexOf("edit") == -1) &&
        (window.location.pathname.indexOf("@@edit") == -1))
    {
        var resultatsPerPagina = 66;

        if (pathname.indexOf("sortingView") != -1)
        {
            pathname = pathname.split("sortingView")[0];
            resultatsPerPagina = 400;
        }

        $.getJSON(pathname + "returnOrderedList", function() {
        })
        .error(function() { alert("No s'ha pogut carregar la llista d'objectes"); })
        .complete(function( data ) {

            var llista_ids = ['Expedient_Ana_Mendieta', 'Expedient_Antoni_Tapies_Els_llocs_de_lart'];

            llista_ids = jQuery.parseJSON( data.responseText );

            parametres_visualitzacio = {llista_ids: llista_ids['Ids'], visualitzacio: 'imatge', zoom: '1', pagina_actual: 1, resultats_per_pagina: resultatsPerPagina};

            $('#visual-portal-wrapper').get(0).parametres_visualitzacio = parametres_visualitzacio;

            parametres_visualitzacio_json = JSON.stringify(parametres_visualitzacio);

            var currentView = '';
            if (window.location.pathname.indexOf("sortingView") != -1)
            {
                currentView = 'orderPlaylistView';
            }
            else
            {
                currentView = 'playlistView';
            }

            $.post(pathname + currentView, {parametres_visualitzacio: parametres_visualitzacio_json}, function(data){
                $('div#zona_resultats').replaceWith(data);
            })
            .complete(function( data ){
                // The sortable list of objects
                if (currentView == 'orderPlaylistView')
                {
                    $('#sortable').sortable({
                        update: function() {
                            pathname = getPath();
                            order = getOrder();
                            updateList(pathname.split('sortingView')[0], order);
                        }
                    });
                // Enable bind to be able to delete elements from the playlist
                $("#sortable").on("click", ".trashbin", function(event) {
                    event.preventDefault();
                    removeSelectedObject($(this).attr("data-id"), $(this).attr("data-order"));
                });
                }


            });
        });
    }

/*
    // The sortable list of objects
    $('#sortable').sortable({
        update: function() {
            pathname = getPath();
            order = getOrder();

            updateList(pathname, order);
        }
    });
*/
    // Check and Uncheck all the selection
    $("#forRemove_all").click(function()
    {
        $("input[id$=forRemove]").each(function()
        {
            if (this.checked == false)
            {
                this.checked = true;
            }
            else
            {
                this.checked = false;
            }
        });
    });

    // Delete all the selection
    $("#deleteAll").click(function()
    {
        $("#sortable").children().each(function()
        {
            var inputChecked = jQuery(this).find("input")[0].checked;
            if (inputChecked == true)
            {
                jQuery(this).remove();
            }
        });

        pathname = getPath();
        order = getOrder();
        updateList(pathname, order);
    });


}
f        if ($('#id_organizado_3').is(':checked')){
        // if ($('#id_organizado_3') == "checked") {
            $('.field-organizacion').hide("100");
            $('.field-desde').hide("100");
        }else{
            $('.field-organizacion').show("100");
            $('.field-desde').show("100");
        }
    });

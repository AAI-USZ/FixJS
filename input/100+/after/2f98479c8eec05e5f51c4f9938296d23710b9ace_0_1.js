function() {
    $(Edgar.map).on('modechanged', _setupNewSpecies);

    // maybe the species is already set on the URL
    if (mapSpecies !== null) {
        setTimeout(function() {changeSpecies(mapSpecies);}, 1);
    }

    // set up the cancel button
    $('#button_cancelselect').click(function(e) {
        $('#speciesselector').hide('blind');        
    });

    // hide the cancel button if we start blank
    if (Edgar.mapmode === 'blank') {
        $('#button_cancelselect').hide();
    }

    // set up the change-species button
    $('#button_changespecies').click(function(e) {
        $('#button_cancelselect').show();
        $('#speciesselector').show('blind');
        $('#species_autocomplete').focus().select();
        $('#species_autocomplete').val('');
    });
}
function() {
    // maybe the species is already set on the URL
    if (mapSpecies !== null) {
        changeSpecies(mapSpecies);
    }

    $(Edgar.map).on('modechanged', _setupNewSpecies);

    // set up the change-species button
    $('#button_changespecies').click(function(e) {
        $('#speciesselector').show('blind');
        $('#species_autocomplete').focus().select();
        $('#species_autocomplete').val('');
    });
}
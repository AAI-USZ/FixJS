function(e) {
        $('#button_cancelselect').show();
        $('#speciesselector').show('blind');
        $('#species_autocomplete').focus().select();
        $('#species_autocomplete').val('');
    }
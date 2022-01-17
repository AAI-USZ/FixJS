function(e) {
        var val = $('#searchfield').val();
        if (val != '') {
            search_string = '';
            $('#searchfield').val(search_string);
            $('#searchfield').trigger('input');
        }
    }
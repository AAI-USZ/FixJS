function(e) {
        var val = $('input#searchfield').val();
        if (val != '') {
            search_string = '';
            $('input#searchfield').val(search_string);
            qs.search(search_string);
            qs.cache();
            redraw_grid();
        }
    }
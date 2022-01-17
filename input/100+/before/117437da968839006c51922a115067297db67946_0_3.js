function(data) {
        // console.log('Updating results');
        $('#search-icon').html('s');

        if ($(location).attr('hash').substring(2) !== query) {
            // console.log('Values different', $(location).attr('hash').substring(2), query);
            return;
        }

        clear_map();
        $('#grid-search-list').empty();
        $('#table-search-list').empty();
        $('#gridItem').tmpl(data.objects).appendTo('#grid-search-list');
        redraw_grid();
        set_number_of_reps(data.meta.total_count);
        $('#listItem').tmpl(data.objects).appendTo('#table-search-list');
        $('#searchfield').data('searching', undefined);
        add_pointers();
    }
function () {
    initialize_map();
    add_pointers();

    $('#searchform').submit(function (event) {
        event.preventDefault();
    });

    $('#listviewbutton').bind('click', function () {
        $('#profiles_listview').hide();
        $('#profiles_gridview').show();
        redraw_grid();
    });

    $('#gridviewbutton').bind('click', function () {
        $('#profiles_gridview').hide();
        $('#profiles_listview').show();
    });

    qs = $('input#searchfield').quicksearch('ul#searchlist li', {
        'show': function () {
            map.addLayer(markers_array[this.id]);
            $('#tr' + this.id.slice(2)).show();
            $(this).show();
        },
        'hide': function () {
            map.removeLayer(markers_array[this.id]);
            $('#tr' + this.id.slice(2)).hide();
            $(this).hide();
        },
        'onAfter': function () {
            redraw_grid();
            calculate_number_of_reps();
        }
    });

    search_string = window.location.pathname.substr(8);
    search_string = unescape(search_string);
    if (search_string.length > 0) {
        $('input#searchfield').val(search_string);
        qs.search(search_string);
        qs.cache();
        redraw_grid();
    }
}
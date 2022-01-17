function () {
    initialize_map();

    view = hash_get_value('view');
    if (view == 'list') {
        $('#profiles_gridview').hide();
        $('#profiles_listview').show();
    }

    $('#searchform').submit(function (event) {
        event.preventDefault();
    });

    $('#listviewbutton').bind('click', function () {
        $('#profiles_listview').hide();
        $('#profiles_gridview').show();
        hash_set_value('view', 'grid');
        redraw_grid();
    });

    $('#gridviewbutton').bind('click', function () {
        $('#profiles_gridview').hide();
        $('#profiles_listview').show();
        hash_set_value('view', 'list');
    });

    // Show advanced search options if used in url.
    if (hash_get_value('group') || hash_get_value('area') || hash_get_value('country')) {
        $('#adv-search').show();
    }

    // Advanced button click.
    $('#adv-search-icon').click(function() {
        $('#adv-search').slideToggle();
    });

    // Set values to fields.
    set_dropdown_value('#adv-search-group', hash_get_value('group'));
    set_dropdown_value('#adv-search-area', hash_get_value('area'));
    set_dropdown_value('#adv-search-country', hash_get_value('country'));

    // Bind events.
    bind_events();

    // Enable search field when ready.
    $('#searchfield').attr('Placeholder', 'Filter using any keyword');
    $('#searchfield').removeAttr('disabled');
    $('#searchfield').val(hash_get_value('search'));

    send_query();
}
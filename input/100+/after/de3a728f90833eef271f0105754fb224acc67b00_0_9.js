function () {
    initialize_map();

    var view = hash_get_value('view');
    if (view === 'list') {
        $('#profiles_gridview').hide();
        $('#profiles_listview').show();
    }

    $('#searchform').submit(function (event) {
        event.preventDefault();
    });

    $('#listviewbutton').bind('click', function () {
        switch_views('list');
    });

    $('#gridviewbutton').bind('click', function () {
        switch_views('grid');
    });

    // Show advanced search options if used in url.
    if (hash_get_value('group') || hash_get_value('area') || hash_get_value('country')) {
        $('#adv-search').show();
    }

    // Advanced button click.
    $('#adv-search-icon').click(function() {
        $('#adv-search').slideToggle();
    });

    // Export to CSV click.
    $('#csv-export-button').click(function() {
        hash_set_value('format', 'csv');
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
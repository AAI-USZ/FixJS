function () {
    initialize_map();

    var view = hash_get_value('view');
    if (view === 'list') {
        ProfilesLib.gridview_elm.hide();
        ProfilesLib.listview_elm.show();
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
    set_dropdown_value(ProfilesLib.adv_search_group_elm, hash_get_value('group'));
    set_dropdown_value(ProfilesLib.adv_search_area_elm, hash_get_value('area'));
    set_dropdown_value(ProfilesLib.adv_search_country_elm, hash_get_value('country'));

    // Bind events.
    bind_events();

    // Enable search field when ready.
    ProfilesLib.searchfield_elm.attr('Placeholder', 'Filter using any keyword');
    ProfilesLib.searchfield_elm.removeAttr('disabled');
    ProfilesLib.searchfield_elm.val(hash_get_value('search'));

    send_query();
}
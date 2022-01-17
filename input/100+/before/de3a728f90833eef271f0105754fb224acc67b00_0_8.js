f    // Bind events
    // console.log('Binding events');
    // Update hash, on search input update.
    $('#searchfield').bind('propertychange keyup input paste', function(event) {
        // Set icon.
        $('#search-icon').html('{');
        hash_set_value('search', $('#searchfield').val());
    });

    // Set advanced search events.
    $('#adv-search-group').change(function() {
        // Set icon.
        $('#search-icon').html('{');
        hash_set_value('group', $('#adv-search-group').val());
    });

    $('#adv-search-country').change(function() {
        // Set icon.
        $('#search-icon').html('{');
        hash_set_value('country', $('#adv-search-country').val());
    });

    $('#adv-search-area').change(function() {
        // Set icon.
        $('#search-icon').html('{');
        hash_set_value('area', $('#adv-search-area').val());
    });

    $(window).bind('hashchange', function(e) { send_query(); });
}

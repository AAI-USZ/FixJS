function send_query() {
    value = $(location).attr('hash').substring(2);
    // console.log('Value', value);

    // Make sure we are not firing the same same request twice.
    if ($('#searchfield').data('searching') === value) {
        return;
    }

    $('#searchfield').data('searching', value)

    // Unbind change events to avoid triggering twice the same action.
    unbind_events();

    // console.log('Sending', value);

    // Form query based on URL
    extra_q = ''
    country = hash_get_value('country');
    set_dropdown_value('#adv-search-country', country);
    if (country) {
        extra_q += '&profile__country__iexact=' + country;
    }

    area = hash_get_value('area');
    set_dropdown_value('#adv-search-area', area);
    if (area) {
        extra_q += '&profile__functional_areas__name__iexact=' + area;
    }

    search = hash_get_value('search');
    $('#searchfield').val(search);
    if (search) {
        extra_q += '&query=' + search;
    }

    group = hash_get_value('group');
    set_dropdown_value('#adv-search-group', group);
    if (group) {
        extra_q += '&group=' + group;
    }

    // Abort previous request
    if (request) {
        // console.log(request.state());
        request.abort()
        // console.log(request.state());
    }
    request = $.ajax({
        url: '/api/v1/rep/?limit=0&order_by=profile__country,last_name,first_name' + extra_q,
        success: update_results(value),
        error: request_error
    });

    // Rebind events.
    bind_events();
}
f    var extra_q = '';
    var csv = false;
    var API_URL = '/api/v1/rep/?limit=0&order_by=profile__country,last_name,first_name';
    var value = $(location).attr('hash').substring(2);

    // Make sure we are not firing the same same request twice.
    if (ProfilesLib.searchfield_elm.data('searching') === value) {
        return;
    }

    // Set icon.
    ProfilesLib.search_icon_elm.html('{');

    ProfilesLib.searchfield_elm.data('searching', value);

    // Unbind change events to avoid triggering twice the same action.
    unbind_events();

    // Form query based on URL
    var country = hash_get_value('country');
    set_dropdown_value(ProfilesLib.adv_search_country_elm, country);
    if (country) {
        extra_q += '&profile__country__iexact=' + country;
    }

    var area = hash_get_value('area');
    set_dropdown_value(ProfilesLib.adv_search_area_elm, area);
    if (area) {
        extra_q += '&profile__functional_areas__name__iexact=' + area;
    }

    var search = hash_get_value('search');
    ProfilesLib.searchfield_elm.val(search);
    if (search) {
        extra_q += '&query=' + search;
    }

    var group = hash_get_value('group');
    set_dropdown_value(ProfilesLib.adv_search_group_elm, group);
    if (group) {
        extra_q += '&group=' + group;
    }

    var format = hash_get_value('format');
    if (format && format == 'csv') {
        csv = true;
        extra_q += '&format=csv';
    }

    if (!csv) {
        // Abort previous request
        if (ProfilesLib.request) {
            ProfilesLib.request.abort();
        }
        ProfilesLib.request = $.ajax({
            url: API_URL + extra_q,
            success: update_results(value),
            error: request_error,
            timeout: 30000
        });
    }
    else {
        window.location = API_URL + extra_q;
    }

    // Rebind events.
    bind_events();

    if (csv) {
        // Remove CSV export variable to also load results in the
        // page. We do this change after bind_events() we can actually
        // capture this event.
        hash_set_value('format', '');

        // Save current map zoom and center
        var zoom = ProfilesLib.map.getZoom();
        var center = ProfilesLib.map.getCenter();

        // We shouldn't touch "private" variables but this is to force
        // map to reload tiles. When a user hits the CSV export page,
        // tile loading is interrupted by the change of
        // window.location. By re-setting map's view (setView) we
        // force tile loading.
        ProfilesLib.map._zoom = -1;
        ProfilesLib.map.setView(center, zoom);
    }
}

f    var extra_q = '';
    var API_URL = '/api/v1/event/?limit=0';
    var value = $(location).attr('hash').substring(2);

    // Make sure we are not firing the same same request twice.
    if (EventsLib.searchfield_elm.data('searching') === value) {
        return;
    }

    // Set icon.
    EventsLib.search_icon_elm.html('{');

    EventsLib.searchfield_elm.data('searching', value);

    // Unbind change events to avoid triggering twice the same action.
    unbind_events();

    // Period selector.
    var period = hash_get_value('period');
    set_dropdown_value(EventsLib.period_selector_elm, period);
    if (period) {
        var today = new Date();
        var today_utc_string = UTCDateString(today);
        if (period === 'future') {
            extra_q += '&start__gte=' + today_utc_string;
        }
        else if (period === 'past') {
            extra_q += '&start__lt=' + today_utc_string;
        }
        else if (period === 'all') {
            extra_q += '&start__gt=1970-01-01';
        }
    }

    // Search term.
    var search = hash_get_value('search');
    EventsLib.searchfield_elm.val(search);
    if (search) {
        extra_q += '&query=' + search;
    }

    // Abort previous request
    if (EventsLib.request) {
        EventsLib.request.abort();
    }
    EventsLib.request = $.ajax({
        url: API_URL + extra_q,
        success: update_results(value),
        error: request_error,
        timeout: 30000
    });

    // Rebind events.
    bind_events();
}

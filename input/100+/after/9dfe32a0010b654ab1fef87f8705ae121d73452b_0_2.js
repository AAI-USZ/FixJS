function open_edit_booking_form(booking) {
    new_booking_date = new_booking_date || iso2date(booking.start_time);
    if (booking.cancel_allowed) {
        $('.booking-delete-section').show();
    } else {
        $('.booking-delete-section').hide();
    };
    $('#booking-name').val(booking.name);
    $('#booking-public').attr('checked', 'checked');
    $('#booking-description').val(booking.description);
    $('#booking-notes').val(booking.notes);
    $('#booking-no_of_people').val(booking.no_of_people);
    var booking_cost_ele = $('#booking-cost')[0];
    if (booking_cost_ele.tagName != 'input') {
        booking_cost_ele.textContent = locale_data.currency_symbol + ' ' + resource_map[booking.resource_id].price;
    } else {
        booking_cost_ele.value = booking.cost;
    };
    $('#for-member').val((booking.member).toString());
    $('#booking-id').val((booking.id).toString());
    $('#for-member-search').val(booking.member_name);
    // $('#new-booking-date').text($.datepicker.formatDate('D, MM d, yy', (new_booking_date)));
    $('#new-booking-date').text(moment(new_booking_date).format("ddd, MMMM Do, YYYY"));
    var booking_duration = (new Date(booking.end_time)) - (new Date(booking.start_time));
    var min15 = 15*60*1000;
    var upper_slots_time = (Math.round((booking_duration / 2)/min15) * min15) - min15;
    if (booking_action == 'drop') {
        var dropped_slot_time = (dropped_slot.split(':')[0] * 60 * 60 * 1000) + (dropped_slot.split(':')[1] * 60 * 1000);
        if (dropped_slot_time > upper_slots_time) {
            var offset = (dropped_slot_time - upper_slots_time);
            var start_time = new Date(new_booking_date.getTime() + offset);
            var end_time = new Date(start_time.getTime() + booking_duration);
            var start_iso = date2isotime(start_time, true);
            var end_iso = date2isotime(end_time, true);
        } else {
            var start_iso = '00:00';
            var end_time = new Date(new_booking_date.getTime() + booking_duration);
            var end_iso = date2isotime(end_time, true);
        };
    } else {
        var start_iso = date2isotime(iso2date(booking.start_time), true);
        var end_iso = date2isotime(iso2date(booking.end_time), true);
    };
    $('#new-starts').val(start_iso);
    $('#new-ends').val(end_iso);
    $('#new-ends').attr('min', start_iso);
    $('#booking-cost').val(booking.cost);
    for (var i=0; i< booking.usages_suggested.length; i++) {
        var usage = booking.usages_suggested[i];
        var ele = $('#resource-'+usage.resource_id);
        if (ele[0].type == 'text') {
            ele[0].value = usage.quantity;
        } else {
            ele.attr('checked', 'checked');
        };
    };
    $('#new-booking').dialog({
        title: booking.resource_name,
        close: on_close_booking_form,
        modal: true,
        width: '40em',
        position: 'top'
    });
}
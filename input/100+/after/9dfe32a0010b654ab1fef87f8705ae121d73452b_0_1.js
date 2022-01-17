function open_booking_form(resource_id, resource_name, new_booking_date, start_time, end_time) {
    $('.booking-delete-section').hide();
    $('#booking-id').val('0'); // important
    $('#for-member').val('');
    $('#new-booking-form').reset();
    // $('#new-booking-date').text($.datepicker.formatDate('D, MM d, yy', new_booking_date));
    $('#new-booking-date').text(moment(new_booking_date).format("ddd, MMMM Do, YYYY"));
    $('#new-starts').val(start_time);
    $('#new-ends').val(end_time);
    $('#new-ends').attr('min', start_time);
    $('#booking-cost').text(locale_data.currency_symbol + ' ' + resource_map[resource_id].price);
    // $('#contained-usages-tmpl').tmpl(resource_map[resource_id]['contained']).appendTo('#contained-usages')
    $('#new-booking').dialog({
        title: resource_name,
        close: on_close_booking_form,
        modal: true,
        width: '40em',
        position: 'top'
    });
}
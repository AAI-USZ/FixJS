function() {
    $('.tabstrip').children().removeClass('tabstrip_sel');
    $('.tab').hide();
    $('#events_on_this_page').addClass('tabstrip_sel');
    $('#events').show();
  }
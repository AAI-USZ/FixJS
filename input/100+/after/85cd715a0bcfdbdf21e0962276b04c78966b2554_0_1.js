function() {
    var btn = $(this);
    btn.button('toggle');
    var groups = btn.parent().parent().parent().siblings('.control-group');
    if (btn.text() == 'Fixed') {
      groups.slice(1).slideUp('fast', function() {
        groups.eq(0).slideDown('fast');
      });
    } else {
      groups.eq(0).slideUp('fast', function() {
        groups.slice(1).slideDown('fast');
      });
    }
    return false;
  }
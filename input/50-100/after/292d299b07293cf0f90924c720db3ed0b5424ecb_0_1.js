function _handle_select_click(item) {
    var active_select = _grab_active_select();
    if (active_select.length == 0 || active_select == item) {
      if (_option_box(item).is(':visible')) {
        item.downpour('blur');
      }
      else {
        item.downpour('focus');
      }
    }
    else {
      active_select.downpour('blur');
    }
  }
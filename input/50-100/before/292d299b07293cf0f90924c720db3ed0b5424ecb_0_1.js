function _handle_select_click(item) {
    if (_option_box(item).is(':visible')) {
      item.downpour('blur');
    }
    else {
      item.downpour('focus');
    }
  }
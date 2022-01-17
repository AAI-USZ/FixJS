function(e) {
    var event = arguments[0] || window.event;
    var item = null;
    for (var i in _val_items) {
      if (_val_items[i].source === event.id) {
        item = _val_items[i];
        break;
      }
    }
    return self.do_validate(item, true);
  }
function() {
    var error_items = [];
    for (var i in _val_items) {
      if (!_val_items[i].is_correct) {
        error_items.push(_val_items[i]);
      }
    }
    return error_items;
  }
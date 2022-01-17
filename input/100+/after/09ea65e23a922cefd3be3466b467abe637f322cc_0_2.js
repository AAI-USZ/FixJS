function(item, pattern, callback) {
    var val_item = {
      source : item.source,
      pattern : pattern
    };
    if (item.display) {
      val_item.display = item.display;
    }
    if (item.condition) {
      val_item.condition = item.condition;
    }
    if (callback) {
      val_item.callback = callback;
    }

    if (item.identity) {
      _val_items[item.identity] = val_item;
    } else if ( typeof (item.source) === 'string') {
      _val_items[item.source] = val_item;
    } else {
      _val_items.push(val_item);
    }
  }
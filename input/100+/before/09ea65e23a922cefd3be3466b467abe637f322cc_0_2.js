function(item, pattern, callback) {
    var val_item = {
      source : item.source,
      pattern : pattern
    };
    if (item.alias !== undefined) {
      val_item.alias = item.alias;
    }
    if (item.condition !== undefined) {
      val_item.condition = item.condition;
    }
    if (callback !== undefined) {
      val_item.callback = callback;
    }
    _val_items.push(val_item);
  }
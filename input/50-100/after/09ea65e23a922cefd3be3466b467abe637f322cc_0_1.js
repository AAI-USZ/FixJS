function(identity) {
    var item = _val_items[identity];
    if (item) {
      return self.do_validate(item, true);
    } else {
      return undefined;
    }
  }
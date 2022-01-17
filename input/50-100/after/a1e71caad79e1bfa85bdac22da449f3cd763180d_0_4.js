function remove(key, flag) {
    var storage = _selectStorage(flag),
        selectKey = storage.getItem(key);

    if (_checkArgument('String', key)) {
      if (selectKey) {
        storage.removeItem(key);
      } else {
        console.log('This key is not in storage');
      }
    }
  }
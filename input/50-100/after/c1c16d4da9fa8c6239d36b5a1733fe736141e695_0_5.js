function remove(key, flag) {
    var storage = _selectStorage(flag, 'remove()'),
        selectKey = storage.getItem(key);

    if (_checkArgument('String', key)) {
      if (selectKey) {
        storage.removeItem(key);
      } else {
        console.log('RS.remove(): This key is not in storage');
      }
    }
  }
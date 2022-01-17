function put(obj, flag) {
    var storage = _selectStorage(flag, 'put()');

    if (_checkArgument('Object', obj) && !_checkArgument('Array', obj)) {
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          storage.setItem(i, JSON.stringify(obj[i]));
        }
      }
    } else {
      throw new Error('RS.put(): 1st argument should be object');
    }
  }
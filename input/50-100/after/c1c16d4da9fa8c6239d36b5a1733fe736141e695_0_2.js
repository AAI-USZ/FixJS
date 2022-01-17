function _selectStorage(flag, fun) {
    var storage;

    if (!_checkArgument('Boolean', flag) && flag !== undefined) {
      throw new Error('RS.' + fun + ': 2nd argument should be boolean');
    } else {
      storage = (flag === true || flag === undefined) ? localStorage : sessionStorage;
    }

    return storage;
  }
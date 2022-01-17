function _selectStorage(flag) {
    var storage;

    if (typeof flag !== 'boolean' && flag !== undefined) {
      throw new Error('2nd argument should be boolean');
    } else {
      if (flag === true || flag === undefined) {
        storage = localStorage;
      } else {
        storage = sessionStorage;
      }
    }

    return storage;
  }
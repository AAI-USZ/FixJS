function(obj, type) {
    if (obj === undefined) return false;
    if (type === 'Any'
      || obj === null)     return true;

    return typeof type === 'function'
      ? obj instanceof type
      : _toString.call(obj) === '[object '+type+']';
  }
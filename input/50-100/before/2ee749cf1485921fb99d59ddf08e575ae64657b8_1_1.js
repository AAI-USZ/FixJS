function(obj, type) {
    if (type === 'Any') return true;
    if (obj == null)    return false;

    return typeof type === 'function'
      ? obj instanceof type
      : _toString.call(obj) === '[object '+type+']';
  }
function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  }
function isEmpty(obj, fields) {
    if (obj == null || typeof(obj) != 'object' ||
        !fields || !fields.length) {
      return true;
    }
    for (var i = 0; i < fields.length; i++) {
      if (obj.hasOwnProperty(fields[i]) && obj[fields[i]]) {
        return false;
      }
    }
    return true;
  }
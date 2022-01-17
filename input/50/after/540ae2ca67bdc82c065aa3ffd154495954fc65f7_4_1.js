function(key, width) {
    var len;
    len = Math.max(0, width - ("" + key).length);
    return Array(len + 1).join('0') + key;
  }
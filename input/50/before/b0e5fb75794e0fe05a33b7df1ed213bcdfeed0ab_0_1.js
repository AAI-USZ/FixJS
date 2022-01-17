function (arrlike) {
    if (Array.isArray) { return Array.isArray(arrlike); }
    return Object.prototype.toString.call(arrlike) === '[object Array]';
  }
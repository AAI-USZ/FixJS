function getUrlParams(str) {
    var result = {};
    var search = str.split('?');
    if (search.length === 0) {
      return result;
    }
    var arr = search[1].split('&');
    for (var i = 0, l = arr.length; i < l; i++) {
      var kv = arr[i].split('=');
      result[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
    }
    return result;
  }
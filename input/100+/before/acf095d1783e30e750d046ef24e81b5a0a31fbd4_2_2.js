function dealoc(obj) {
  if (obj) {
    if (isElement(obj)) {
      var element = obj;
      if (element.nodeName) element = jqLite(element);
      if (element.dealoc) element.dealoc();
    } else {
      for(var key in jqCache) {
        var value = jqCache[key];
        if (value.$scope == obj) {
          delete jqCache[key];
        }
      }
    }

  }
}
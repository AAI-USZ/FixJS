function dealoc(obj) {
  var jqCache = jqLite.cache;
  if (obj) {
    if (isElement(obj)) {
      cleanup(jqLite(obj));
    } else {
      for(var key in jqCache) {
        var value = jqCache[key];
        if (value.data && value.data.$scope == obj) {
          delete jqCache[key];
        }
      }
    }
  }

  function cleanup(element) {
    element.unbind().removeData();
    for ( var i = 0, children = element.children() || []; i < children.length; i++) {
      cleanup(jqLite(children[i]));
    }
  }
}
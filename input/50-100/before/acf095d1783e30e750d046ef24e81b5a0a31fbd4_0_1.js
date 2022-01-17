function JQLiteRemoveData(element) {
  var cacheId = element[jqName],
      cache = jqCache[cacheId];

  if (cache) {
    if (cache.handle) {
      cache.events.$destroy && cache.handle({}, '$destroy');
      JQLiteUnbind(element);
    }
    delete jqCache[cacheId];
    element[jqName] = undefined; // ie does not allow deletion of attributes on elements.
  }
}
function JQLiteData(element, key, value) {
  var cacheId = element[jqName],
      cache = jqCache[cacheId || -1];

  if (isDefined(value)) {
    if (!cache) {
      element[jqName] = cacheId = jqNextId();
      cache = jqCache[cacheId] = {};
    }
    cache[key] = value;
  } else {
    if (isDefined(key)) {
      if (isObject(key)) {
        if (!cacheId) element[jqName] = cacheId = jqNextId();
        jqCache[cacheId] = cache = (jqCache[cacheId] || {});
        extend(cache, key);
      } else {
        return cache ? cache[key] : undefined;
      }
    } else {
      if (!cacheId) element[jqName] = cacheId = jqNextId();

      return cache
          ? cache
          : cache = jqCache[cacheId] = {};
    }
  }
}
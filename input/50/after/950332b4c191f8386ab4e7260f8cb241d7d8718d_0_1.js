function () {
      var cache = get_cache_service();
      var session = cache.createSession(
                      sessionName,
                      storagePolicy,
                      Components.interfaces.nsICache.STREAM_BASED);
      session.asyncOpenCacheEntry(key, access, this);
    }
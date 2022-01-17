function() {
    var cache = get_cache_service();
    var session = cache.createSession(
                    "HTTP",
                    this._asFile ? Ci.nsICache.STORE_ON_DISK_AS_FILE
                                 : Ci.nsICache.STORE_ON_DISK,
                    Ci.nsICache.STREAM_BASED);
    var cacheEntry = session.asyncOpenCacheEntry(
                       this._key,
                       this._append ? Ci.nsICache.ACCESS_READ_WRITE
                                    : Ci.nsICache.ACCESS_WRITE,
                       this);
  }
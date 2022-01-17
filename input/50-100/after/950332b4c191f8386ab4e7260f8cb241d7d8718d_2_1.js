function SyncWithCacheThread(aFunc) {
  do_check_eq(sync_with_cache_IO_thread_cb.listener, null);
  sync_with_cache_IO_thread_cb.listener = aFunc;

  var cache = get_cache_service();
  var session = cache.createSession(
                  "HTTP",
                  Ci.nsICache.STORE_ANYWHERE,
                  Ci.nsICache.STREAM_BASED);

  session.asyncOpenCacheEntry("nonexistententry",
                              Ci.nsICache.ACCESS_READ,
                              sync_with_cache_IO_thread_cb);
}
function store_entries(cb)
{
  if (cb) {
    store_cb = cb;
    store_idx = 0;
  }

  if (store_idx == entries.length) {
    do_execute_soon(store_cb);
    return;
  }

  var cache = get_cache_service();
  var session = cache.createSession(kPrivateBrowsing,
                                    get_storage_policy(entries[store_idx][2]),
                                    Ci.nsICache.STREAM_BASED);
  if (entries[store_idx][2] == kPrivate) {
    session.isPrivate = true;
  }

  var cacheEntry = session.asyncOpenCacheEntry(entries[store_idx][0],
                                               Ci.nsICache.ACCESS_WRITE,
                                               store_data);
}
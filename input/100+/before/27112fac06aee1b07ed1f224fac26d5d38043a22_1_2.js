function check_entries(cb, pbExited)
{
  if (cb) {
    check_cb = cb;
    check_idx = 0;
    check_pb_exited = pbExited;
  }

  if (check_idx == entries.length) {
    do_execute_soon(check_cb);
    return;
  }

  var cache = get_cache_service();
  var session = cache.createSession(kPrivateBrowsing,
                                    get_storage_policy(entries[check_idx][2]),
                                    Ci.nsICache.STREAM_BASED);
  if (entries[check_idx][2] == kPrivate) {
    session.isPrivate = true;
  }

  var cacheEntry = session.asyncOpenCacheEntry(entries[check_idx][0],
                                               Ci.nsICache.ACCESS_READ,
                                               check_data);
}
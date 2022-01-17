function (server, callback, port, host, timeout, enable_tls, max) {
    var pool = exports.get_pool(server, port, host, timeout, enable_tls, max);
    pool.acquire(callback);
}
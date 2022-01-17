function (server, callback, port, host, timeout, max) {
    var pool = exports.get_pool(server, port, host, timeout, max);
    pool.acquire(callback);
}
function(filepath) {
    var m = createMovieObj(filepath, true, (new Date()).getTime());
    if (m) {
        var key = getMovieKey(m.hash);
        var client = this.client;
        client.hmset(key, m, function(err, reply) {
            if (err == null && reply.toString().toUpperCase() == 'OK') {
                client.multi([
                    ['sadd', getMoviesKey(ALL_MV), m.hash],
                    ['sadd', getMoviesKey(AVAIL_MV), m.hash],
                    ['srem', getMoviesKey(REMOVED_MV), m.hash]
                ]).exec(function(err, replies) {});
            }
        });
    }
}
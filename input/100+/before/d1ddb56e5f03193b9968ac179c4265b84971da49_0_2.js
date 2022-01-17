function supervise(socket, watchers, watchersWithPids, config) {

    if (watchersWithPids == undefined) { watchersWithPids = []; }
    if (config == undefined) { config = DEFAULT_CONFIG; }


    watchers.forEach(function(watcher) {
        // only the aggregation is sent here
        if (watcher == 'sockets') {
            hookGraph(socket, 'socket-stats', ['reads'], '', false, config);
        } else {
            hookGraph(socket, watcher, ['cpu', 'mem'], 'stats-', true, config);
        }
    });

    watchersWithPids.forEach(function(watcher) {
        if (watcher == 'sockets') {
            socket.on('socket-stats-fds', function(data) {
                data.fds.forEach(function(fd) {
                    hookGraph(socket, 'socket-stats-' + fd, ['reads'],
                              '', false, config);
                });
            });
        } else {
            // get the list of processes for this watcher from the server
            socket.on('stats-' + watcher + '-pids', function(data) {
                data.pids.forEach(function(pid) {
                    var id = watcher + '-' + pid;
                    hookGraph(socket, id, ['cpu', 'mem'], 'stats-', false,
                              config);
                });
            });
        }
    });

    // start the streaming of data, once the callbacks in place.
    socket.emit('get_stats', { watchers: watchers,
                               watchersWithPids: watchersWithPids});
}
function(watcher) {
        // only the aggregation is sent here
        if (watcher == 'sockets') {
            hookGraph(socket, 'socket-stats', ['reads'], '', false, config);
        } else {
            hookGraph(socket, watcher, ['cpu', 'mem'], 'stats-', true, config);
        }
    }
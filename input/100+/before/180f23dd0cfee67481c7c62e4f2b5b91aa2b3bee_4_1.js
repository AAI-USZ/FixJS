function(server, remote, cb) {
    var self = this;

    if(remote) {
        cb(new Error('Remotes not implemented yet.'));
    } else {
        if(self._workers[server]) {
            //Already started
            cb(new Error(server + ' is already running'));
        } else {
            psm.log.silly('Setting up a new worker object');
            self._workers[server] = {
                server: server,
                ready: false,
                pidFile: psm.config.pids.worker.replace('$#', server),
                socketFile: psm.config.sockets.worker.replace('$#', server)
            };

            psm.log.debug('Starting worker');
            /*
              var wrk = new Worker({
              serverId: server,
              socketFile: self._workers[server].socketFile,
              managerPort: psm.config.api.port
              });
            */
            self._workers[server].proc = forever.start(path.join(__dirname, '..', '..', 'bin', 'psm-worker'), {
                max: 1,
                silent: true,
                pidFile: self._workers[server].pidFile,
                options: [server, self._workers[server].socketFile, psm.config.api.port]
            });

            psm.log.debug('Worker started, waiting for ready...');
            self.once('ready::' + server, function(err) {
                if(err) { if(cb) cb(err); return; }

                self._workers[server].socket.start(function(err) {
                    if(cb) cb(err);
                });
            });
        }
    }
}
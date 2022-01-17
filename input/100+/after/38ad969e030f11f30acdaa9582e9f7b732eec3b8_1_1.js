function startMaster() {
    log.info("Master PID " + process.pid + " starting");

    var num_workers = server_conf.numWorkers || 
                      require('os').cpus().length;
    var exiting = false;
    var workers = {};

    for (var i = 0; i < num_workers; i++) {
        var worker = cluster.fork();
        workers[worker.pid] = worker;
    }

    cluster.on('death', function(worker) {
        // Make sure not to keep restarting workers while exiting
        if (exiting) { return; }
        log.info('Worker ' + worker.pid + ' died');
        delete workers[worker.pid];
        var new_worker = cluster.fork();
        workers[new_worker.pid] = new_worker;
    });

    // Kill the master and all workers. If this is being monitored at the
    // OS level, the whole thing should restart.
    function performExit () {
        exiting = true;
        log.info("Master exiting...");
        for (pid in workers) {
            var worker = workers[pid];
            worker.kill();
            log.info("Killed worker " + worker.pid);
        };
        process.exit(1);
    }

    // See: https://github.com/joyent/node/issues/2060#issuecomment-2767191
    process.on('SIGINT', performExit);

    // Open up a telnet REPL for interactive access to the server.
    var repl_config = nconf.get('repl');
    if (repl_config.enabled) {
        // TODO: Move this off into its own repl.js module?

        // Things to expose to the REPL
        var context = {
            __: _,
            log: log,
            server_conf: server_conf,
            workers: workers,

            // Force-exit the master, which hopefully gets restarted by an
            // OS-level monitor like supervisor.
            kill: performExit,

            // Kill all the workers and let the master restart them. More
            // forgiving than kill()
            restart: function () {
                log.info("Recycling workers...");
                var killed = [];
                for (pid in workers) {
                    var worker = workers[pid];
                    worker.kill();
                    log.info("Killed worker " + worker.pid);
                    killed.push(pid);
                };
                return killed;
            }
        };

        // REPL eval handler that logs all commands
        // Cribbed from https://github.com/joyent/node/blob/v0.6/lib/repl.js#L76
        var vm = require('vm');
        var eval = function(code, context, file, cb) {
            log.info("REPL (cmd): > " + util.inspect(code));
            var err, result;
            try {
                result = vm.runInContext(code, context, file);
            } catch (e) {
                err = e;
            }
            log.info("REPL (result): " + util.inspect([err, result]));
            cb(err, result);
        };

        // Finally, set up the server to accept REPL connections.
        var host = repl_config.host;
        var port = repl_config.port;
        net.createServer(function (socket) {
            var r_host = socket.remoteAddress;
            var r_port = socket.remotePort;
            var shell = repl.start("ks> ", socket, eval);
            _(shell.context).extend(context);
            log.info("REPL received connection from "+r_host+":"+r_port); 
            socket.on('close', function () {
                log.info("REPL connection closed for "+r_host+":"+r_port);
            });
        }).listen(port, host)
        log.info("Telnet REPL interface started on " + host + ":" + port);
    }

}
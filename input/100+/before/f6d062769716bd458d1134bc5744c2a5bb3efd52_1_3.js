function runMaster () {
    var master_server;
    var master_repl_server;

    function performExit () {
        log.info("Master PID " + process.pid + " exiting");
        is_exiting = true;
        for (var pid in workers) {
            var worker = workers[pid];
            log.info("Killing worker PID " + worker.pid);
            worker.kill();
        }
        if (master_repl_server) {
            master_repl_server.close();
        }
        process.exit(0);
    }

    process.on('SIGINT', performExit);
    process.on('uncaughtException', function (err) {
        log.error('uncaughtException:', err.message);
        log.error(err.stack);
        //performExit();
    });

    function fork () {
        // Pick an available port.
        var port = server_conf.port + 1;
        var ports_taken = _(workers).pluck('port');
        while (-1 != ports_taken.indexOf(port)) { port++; }

        // Fork a new worker process
        var worker = child_process.fork(
            process.argv[1], 
            process.argv.slice(2),
            {env: _(process.env).chain().clone().extend({
                "KS_IS_WORKER": 1,
                "KS_PORT": port
            }).value()}
        );

        // Initialize some bookkeeping for the new worker.
        worker.port = port;
        worker.requests = 0;
        workers[worker.pid] = worker;
        worker_list = _(workers).values();

        worker.on('message', function (m, handle) {
            log.debug("Worker PID " + worker.pid + " says: " + JSON.stringify(m)); 
        });

        // If this worker exits, we need to for get its PID, free up its port,
        // and start a new one as long as we're not exiting.
        worker.on('exit', function () {
            log.info("Worker PID "+worker.pid+" exited");
            delete workers[worker.pid];
            worker_list = _(workers).values();
            if (!is_exiting) { fork(); }
        });

        return worker;
    }

    // Fork the initial set of workers
    for (var i=0; i<server_conf.numWorkers; i++) { fork(); }

    // Set up a round-robin HTTP proxy between the workers.
    var request_cnt = 0;
    var port = server_conf.port;
    var max_requests = server_conf.workerMaxRequests || 10;
    log.info("Master PID " + process.pid + " starting on port " + port);
    httpProxy.createServer(function (req, res, proxy) {
        
        // Grab the worker off the top of the list.
        var worker = worker_list.shift();

        // Assign an ID to this request, for tracking through logs & etc.
        var request_id = (request_cnt++) + '-' + worker.pid;
        req.headers['X-Request-ID'] = request_id;

        // Patch to trap the end of the proxy response.
        var orig_end = res.end;
        res.end = function (data, enc) {
            orig_end.call(res, data, enc);
            if (++(worker.requests) >= max_requests) {
                log.info("Worker PID " + worker.pid + " reached max requests");
                worker.kill();
            }
        }

        // Fire up the proxy machinery.
        proxy.proxyRequest(req, res, {
            host: 'localhost',
            port: worker.port
        });

        // Worker goes to the end of the list to maintain round-robin.
        worker_list.push(worker);

    }).listen(port);

    // Open up a telnet REPL for interactive access to the server.
    var repl_config = nconf.get('repl');
    if (repl_config.enabled) {

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
            log.info("Master REPL (cmd): > " + util.inspect(code));
            var err, result;
            try {
                result = vm.runInContext(code, context, file);
            } catch (e) {
                err = e;
            }
            log.info("Master REPL (result): " + util.inspect([err, result]));
            cb(err, result);
        };

        // Finally, set up the server to accept REPL connections.
        var host = repl_config.host;
        var port = repl_config.port;
        master_repl_server = net.createServer(function (socket) {
            var r_host = socket.remoteAddress;
            var r_port = socket.remotePort;
            var shell = repl.start("ks> ", socket, eval);
            _(shell.context).extend(context);
            log.info("Master REPL received connection from "+r_host+":"+r_port); 
            socket.on('close', function () {
                log.info("Master REPL connection closed for "+r_host+":"+r_port);
            });
        }).listen(port, host)
        log.info("Master REPL interface started on " + host + ":" + port);
    }

}
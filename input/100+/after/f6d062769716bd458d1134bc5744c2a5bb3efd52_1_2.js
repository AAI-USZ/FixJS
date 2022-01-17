function (req, res, proxy) {
        
        // Grab the worker off the top of the list.
        var worker = worker_list.shift();
        statsd.increment('kumascript.port_' + worker.port);

        // Assign an ID to this request, for tracking through logs & etc.
        var request_id = (request_cnt++) + '-' + worker.pid;
        req.headers['X-Request-ID'] = request_id;

        // Patch to trap the end of the proxy response.
        var orig_end = res.end;
        res.end = function (data, enc) {
            orig_end.call(res, data, enc);
            if (++(worker.requests) >= max_requests) {
                statsd.increment('kumascript.workers_hit_max_requests');
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

    }
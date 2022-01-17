function(serverSocket, pid, control) {
            // randomize the random number generator, just in case.
            var bits = pid % Config.numChildren;
            for (var b=0; b<bits; b++) {
                Math.random();
            }
            var logfile = global.logfile;
            if (HttpChild.onStart) {
                HttpChild.onStart();
            }
            // onStart is a better way for apps to initialize SQL
            if (Config.mysql) {
                SQL = new MySQL();
                SQL.connect();
            }
            var REQUESTS_PER_CHILD = Config.requestsPerChild;
            var requestHandler = HttpChild.requestHandler;
            var endRequest = HttpChild.endRequest;
            requestsHandled = 0;
            while (requestsHandled < REQUESTS_PER_CHILD) {
                async.write(control, 'r', 1);
                async.read(control, 1);
                var sock = net.accept(serverSocket);
                var keepAlive = true;
                while (keepAlive) {
                    if (++requestsHandled > REQUESTS_PER_CHILD) {
                        keepAlive = false;
                    }
                    // var start_time = time.getrusage();
                    try {
                        if (!req.init(sock)) {
                            break;
                        }
                        // console.log(time.getrusage() - start_time);
                        keepAlive = res.init(sock, keepAlive, requestsHandled);
                        // execute a pure JavaScript handler, if provided.
                        if (requestHandler) {
                            requestHandler();
                        }
                        handleRequest();
                    }
                    catch (e) {
                        if (e !== 'RES.STOP') {
                            errorHandler(e);
//                          Error.exceptionHandler(e);
                        }
                    }
                    if (endRequest) {
                        endRequest();
                    }
                    req.data = {};
                    res.data = {};
                    res.flush();
                    res.reset();
                    // var end_time = time.getrusage();
                    // var elapsed = end_time - start_time;
                    // elapsed = '' + elapsed;
                    // elapsed = elapsed.substr(0, 8);
                    // logfile.write(req.remote_addr + ' ' + req.method + ' ' + req.uri + ' completed in ' + elapsed + 's\n');
                }
                net.close(sock);
                req.close();
                // v8.gc();
            }
            res.close();
        }
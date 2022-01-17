function next(err) {
                // The goofy checks here are to make sure we fire the DTrace
                // probes after an error might have been sent, as in a handler
                // return next(new Error) is basically shorthand for sending an
                // error via res.send(), so we do that before firing the dtrace
                // probe (namely so the status codes get updated in the
                // response).
                var done = false;
                if (err) {
                        if (log.debug())
                                log.debug({err: err}, 'next(err=%s)', err.name);
                        res.send(err);
                        done = true;
                }

                // Callers can stop the chain from proceding if they do
                // return next(false); This is useful for non-errors, but where
                // a response was sent and you don't want the chain to keep
                // going
                if (err === false)
                        done = true;

                // Fire DTrace done for the previous handler.
                if ((i + 1) > 0 && chain[i] && chain[i].fireDone)
                        chain[i].fireDone(req, res);

                // Run the next handler up
                if (!done && chain[++i]) {
                        if (log.trace())
                                log.trace('running %s', chain[i].name || '?');

                        if (chain[i].fireStart)
                                chain[i].fireStart(req);

                        try {
                                return (chain[i].call(self, req, res, next));
                        } catch (e) {
                                log.debug({err: e}, 'uncaughtException');
                                self.emit('uncaughtException',
                                          req,
                                          res,
                                          route,
                                          e);
                                return (callback ? callback(e) : false);
                        }
                }

                // This is the route -done dtrace probe
                if (chain.fireDone)
                        chain.fireDone(req, res);

                if (route === null) {
                        self.emit('preDone', req, res);
                } else {
                        self.emit('done', req, res, route);
                }

                return (callback ? callback(err) : true);
        }
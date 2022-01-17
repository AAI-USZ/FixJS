function () {
            var done = B.bind(this, "done");

            this.config.resolve().then(this.startSession(serverClient, function (err, session) {
                if (err) { return done(err); }

                this.logger.debug('Session was successfully created');
                this.onInterrupt(function () { session.end(); });

                session.onAbort(function (e) {
                    done({message: e.error});
                }.bind(this));

                try {
                    if (this.aborted) { return this.endSession(session); }
                    this.options = B.extend({}, this.options, this.config.options);
                    logSessionLifeCycle(session, this.logger);
                    logSessionMessages(session, this.logger);
                    this.runTests(session, done);
                } catch (e) {
                    done(e);
                }
            }.bind(this)), B.partial(configError, done));
        }
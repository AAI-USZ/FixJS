function (slaves) {
            this.logger.debug('Session was loaded')

            clearTimeout(timer);
            if (slaves.length === 0) {
                return noSlaves(session, this.options, callback);
            }

            runner.setSlaves(slaves);
            var hookError = this.extensionHook("testRun", runner, session);

            if (hookError) {
                this.endSession(session);
                return callback(hookError);
            }

            runner.on("suite:end", function (results) {
                this.endSession(session);
                callback(null, results);
            }.bind(this));
        }
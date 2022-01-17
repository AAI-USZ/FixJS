function (query) {
            var ret = new Promise();
            try {
                this.connection.setMaxListeners(0);
                var fields = [];
                var q = this.connection.query(query, hitch(this, function (err, results) {
                    q.handleRowDescription = orig;
                    if (err) {
                        return ret.errback(err);
                    } else {
                        return ret.callback(results.rows, fields);
                    }
                }));
                var orig = q.handleRowDescription;
                q.handleRowDescription = function (msg) {
                    fields = msg.fields;
                    return orig.apply(q, arguments);
                };
            } catch (e) {
                patio.logError(e);
            }
            return ret;
        }
function (err, data) {
                var parsed;
                if (typeof handler === 'function') {
                    if (!err) {
                        try {
                            parsed  = JSON.parse('{' + data.toString().slice(0, -1) + '}');
                        } catch (e) {
                            err = new Error("Corrupted database contents.");
                        }
                    }
                    handler(err, parsed);
                }
            }
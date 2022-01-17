function(error, result, more) {
                if(error) return callback(error);

                for(var i=0; i<result.length; i++) {
                    self._services[result[i]] = {
                        ready: false,
                        context: null,
                        introspected: null
                    };
                }

                callback(error, self);
            }
function(service, callback) {
        var self = this;
        var cached = self._services[service];

        //Try to fetch the cached result if possible
        if(!cached) {
            throw new Error("Unknown service");
        } else if(cached.ready) {
            callback(null, cached.context);
        } else {
            //Otherwise get the service, which will also fetch the
            //introspection data
            self.use(service, function(error) {
                if(error) return callback(error);
                callback(null, self._services[service].introspected);
            });
        }
    }
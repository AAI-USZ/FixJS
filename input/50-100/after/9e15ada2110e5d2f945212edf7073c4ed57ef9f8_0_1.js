function(error, res, more) {
        if(error) {
            self.emit("error", error);
        } else {
            console.log(res);
            for(var serviceName in res) {
                self._services[serviceName] = {
                    endpoint: res[serviceName],
                    client: null,
                    context: null,
                    introspected: null
                };
            }

            registrarClient.close();
            callback(error, self);
        }
    }
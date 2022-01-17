function Engine(options, callback) {
    if (!(this instanceof Engine)) {
        return new Engine(options, callback);
    }

    var self = this;
    self.options = options || {};
    self._services = {};

    var registrarClient = self._createClient(self.options.registrar || REGISTRAR_ENDPOINT);

    registrarClient.invoke("services", true, function(error, res, more) {
        if(error) {
            self.emit("error", error);
        } else {
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
    });
}
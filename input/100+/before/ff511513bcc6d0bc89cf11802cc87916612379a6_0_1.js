function(serviceEndpoints, req, res, next) {
        if(!(req.service in serviceEndpoints)) {
            //Return an error if the service does not exist
            var error = model.createSyntheticError("ServiceDoesNotExistError", "Service does not exist");
            res.update(error, undefined, false);
        } else {
            //Invokes the call if possible
            var clientsContainer = clients[req.session.id] || newSession(req.session);
            var client = clientsContainer[req.service] || newClient(serviceEndpoints, req);
            var invokeArgs = [req.method].concat(req.args);

            invokeArgs.push(function(error, zerorpcRes, more) {
                res.update(error, zerorpcRes, more);
            });

            client.invoke.apply(client, invokeArgs);
        }
    }
function(error, endpoint) {
            if(error || !endpoint) {
                //Return an error if the service does not exist
                var errorObj = model.createSyntheticError("ServiceDoesNotExistError", "Service does not exist");
                res.update(errorObj, undefined, false);
            } else {
                //Invokes the call if possible
                var client = getConnection(endpoint, req.session, req.service);
                var invokeArgs = [req.method].concat(req.args);

                invokeArgs.push(function(error, zerorpcRes, more) {
                    res.update(error, zerorpcRes, more);
                });

                client.invoke.apply(client, invokeArgs);
            }
        }
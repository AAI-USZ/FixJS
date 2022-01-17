function (success, fail, service, action, args, sync) {
            var uri = "bridge/exec/" + service + "/" + action,
                request = new RemoteFunctionCall(uri),
                name;

            for (name in args) {
                if (Object.hasOwnProperty.call(args, name)) {
                    request.addParam(name, args[name]);
                }
            }

            request[sync ? "makeSyncCall" : "makeAsyncCall"](success, fail);
        }
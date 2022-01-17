function (request, succ, fail, args, env) {
        var extPath = "ext/" + request.params.ext + "/index",
            method = request.params.method,
            extension;
        
        if (frameworkModules.indexOf(extPath + ".js") !== -1) {
            // use util.loadModule for unit-test mocking
            extension = require("../utils").loadModule("../" + extPath);
            if (extension[method]) {
                if (whitelist.isFeatureAllowed(request.origin, request.params.ext)) {
                    extension[method](succ, fail, args, env);
                } else {
                    console.log("Feature denied by whitelist: " + extension);
                    fail(-1, "Feature denied by whitelist", 403);
                }
            } else {
                fail(-1, "Method for " + request.params.ext + " not found", 404);
            }
        } else {
            fail(-1, "Extension not found", 404);
        }
    }
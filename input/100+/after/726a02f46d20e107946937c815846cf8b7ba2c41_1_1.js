function (request, succ, fail, args, env) {
        var extPath = "ext/" + request.params.ext + "/index",
            methodParts = request.params.method ? request.params.method.split('/') : request.params.method,
            extension,
            method,
            shouldFail = false,
            errorMsg,
            errorCode;


        if (frameworkModules.indexOf(extPath + ".js") !== -1) {
            extension = require("../../" + extPath);
            if (extension) {
                if (methodParts) {
                    if (methodParts.length === 1) {
                        method = extension[methodParts[0]];
                    } else {
                        method = methodParts.reduce(function (previous, current, index, array) {
                            var returnValue;

                            if (shouldFail) {
                                return false;
                            }

                            //First time run through
                            if (typeof previous === "string") {
                                if (extension[previous]) {
                                    returnValue = extension[previous];
                                } else {
                                    shouldFail = true;
                                    errorMsg = "Method " + request.params.method + " for " + request.params.ext + " not found";
                                    errorCode = 404;
                                    return false;
                                }
                            } else {
                                returnValue = previous;
                            }
                            //Should always be true (Maybe not with single arrays)
                            if (typeof current === "string") {
                                if (returnValue[current]) {
                                    returnValue = returnValue[current];
                                } else {
                                    shouldFail = true;
                                    errorMsg = "Method " + request.params.method + " for " + request.params.ext + " not found";
                                    errorCode = 404;
                                    return false;
                                }
                            }
                            return returnValue;
                        });
                    }
                    if (method && typeof method === 'function') {
                        if (whitelist.isFeatureAllowed(request.origin, request.params.ext)) {
                            method(succ, fail, args, env);
                        } else {
                            console.log("Feature denied by whitelist: " + extension);
                            shouldFail = true;
                            errorMsg = "Feature denied by whitelist";
                            errorCode = 403;
                        }
                    } else {
                        shouldFail = true;
                        errorMsg = "Method " + request.params.method + " for " + request.params.ext + " not found";
                        errorCode = 404;
                    }
                } else {
                    shouldFail = true;
                    errorMsg = "Method " + request.params.method + " for " + request.params.ext + " not found";
                    errorCode = 404;
                }
            } else  {
                shouldFail = true;
                errorMsg = "Extension " + request.params.ext + " not found";
                errorCode = 404;
            }
        } else {
            shouldFail = true;
            errorMsg = "Extension " + request.params.ext + " not found";
            errorCode = 404;
        }

        if (shouldFail) {
            fail(-1, errorMsg, errorCode);
        }
    }
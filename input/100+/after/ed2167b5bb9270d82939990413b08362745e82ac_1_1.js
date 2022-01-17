function (unused, req) {
            var res = req.res, cb = req.callback;
            if (!cb) {
                this.$logError(this.MISSING_IO_CALLBACK, [res.url]);
            } else if (res.error != null) {
                // an error occured

                // make sure properties are consistent with the error state:
                res.responseText = "";
                res.responseXML = null;
                res.responseJSON = null;

                // call the error callback
                if (cb.onerror == null) {
                    // Generic IO error mgt
                    this.$logError(this.IO_REQUEST_FAILED, [res.url, res.error]);
                } else {
                    var scope = cb.onerrorScope;
                    if (!scope) {
                        scope = cb.scope;
                    }
                    try {
                        cb.onerror.call(scope, res, cb.args);
                    } catch (ex) {
                        this.$logError(this.IO_CALLBACK_ERROR, [res.url], ex);
                    }
                }
            } else {

                // check the response type to adapt it to the request
                if (req.expectedResponseType) {
                    if (req.expectedResponseType == "text") {
                        if (!res.responseText && res.responseJSON != null) {
                            // convert JSON to text
                            if (aria.utils.Type.isString(res.responseJSON)) {
                                // this case is important for JSON-P services which return a simple string
                                // we simply use that string as text
                                // (could be useful to load templates through JSON-P, for example)
                                res.responseText = res.responseJSON;
                            } else {
                                // really convert the JSON structure to a string
                                res.responseText = aria.utils.Json.convertToJsonString(res.responseJSON);
                            }
                        }
                    } else if (req.expectedResponseType == "json") {
                        if (res.responseJSON == null && res.responseText != null) {
                            // convert text to JSON
                            res.responseJSON = aria.utils.Json.load(res.responseText, this, this.JSON_PARSING_ERROR);
                        }
                    }
                }

                var callback = cb.fn, scope = cb.scope;
	            var applyCheck;  
	            // Here a check for "apply" parameter is done. Default apply:false,
	            // this.$callback({fn: myFunction, args: [1,2,3], apply:true },"hello");
	            // we should call: myFunction("hello",1,2,3);
	            if (cb.apply != undefined) {
	                if (cb.apply == true) {
	                    applyCheck = true;
	                } else {
	                    applyCheck = false;
	                }
	            }
	
	            if (cb.resIndex != undefined && applyCheck == true) {
	                if (cb.args && aria.utils.Type.isArray(cb.args)) {
	                    if (cb.resIndex == -1) {
	                        return callback.apply(scope, cb.args);
	                    } else {
	                        cb.args.splice(cb.resIndex, 0, res);
	                        return callback.apply(scope, cb.args);
	                    }
	                }
	                if (cb.args && aria.utils.Type.isObject(cb.args)) {
	                    if (cb.resIndex == -1) {
	                        return callback.call(scope, cb.args);
	                    } else if (cb.resIndex == 0) {
	                        return callback.apply(scope, [res, cb.args]);
	                    } else {
	                        return callback.apply(scope, [cb.args, res]);
	                    }
	                }
	            } else if (cb.resIndex != undefined && (applyCheck == false || applyCheck == undefined)) {
	                if (cb.args && aria.utils.Type.isArray(cb.args)) {
	                    if (cb.resIndex == -1) {
	                        return callback.call(scope, cb.args);
	                    } else {
	                        cb.args.splice(cb.resIndex, 0, res);
	                        return callback.call(scope, cb.args);
	                    }
	                }
	                if (cb.args && aria.utils.Type.isObject(cb.args)) {
	                    if (cb.resIndex == -1) {
	                        return callback.call(scope, cb.args);
	                    } else if (cb.resIndex == 0) {
	                        return callback.call(scope, res, cb.args);
	                    } else {
	                        return callback.call(scope, cb.args, res);
	                    }
	                }
	            } else if ((cb.resIndex == undefined) && (applyCheck == true)) {
	                if (cb.args && aria.utils.Type.isArray(cb.args)) {
	                    return callback.apply(scope, cb.args);
	                }
	                if (cb.args && aria.utils.Type.isObject(cb.args)) {
	                    return callback.call(scope, cb.args);
	                }
	            } else {// fallback
	                return callback.call(scope, res, cb.args);
	                }
	            }
            req = cb = null;
        }
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

                cb.fn.call(cb.scope, res, cb.args);
            }
            req = cb = null;
        }
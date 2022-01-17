function createWebworksReady() {
        function RemoteFunctionCall(functionUri) {
            var paramString = "",
                params = {},
                isPost = false;

            function composeUri() {
                return "http://localhost:8472/" + functionUri;
            }

            function createXhrRequest(uri, isAsync) {
                var request = new XMLHttpRequest(),
                    paramCount = 1,
                    param;

                for (param in params) {
                    if (params.hasOwnProperty(param)) {
                        paramString += param + "=" + params[param] + "&";
                        paramCount++;
                    }
                }

                paramString = paramString.replace(/\&$/, "");

                if (!isPost && paramString) {
                    uri += "?" + paramString;
                }

                // TODO: make get/post
                request.open("GET", uri, isAsync);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                return request;
            }

            this.addParam = function (name, value) {
                params[name] = encodeURIComponent(JSON.stringify(value));
            };

            this.makeSyncCall = function (success, error) {
                var requestUri = composeUri(),
                    request = createXhrRequest(requestUri, false),
                    response, 
                    errored, 
                    cb, 
                    data;

                request.send(isPost ? paramString : null);

                response = JSON.parse(request.responseText || "null");
                errored = response.code < 0;
                cb = errored ? error : success;
                data = errored ? response.msg : response.data;

                if (cb) {
                    cb(data, response);
                }
                else if (errored) {
                    throw data;
                }

                return data;
            };

            this.makeAsyncCall = function (success, error) {
                var requestUri = composeUri(),
                    request = createXhrRequest(requestUri, true);

                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        var response = JSON.parse(request.responseText || "null"),
                        cb = response.code < 0 ? error : success,
                        data = response.code < 0 ? response.msg : response.data;

                        return cb && cb(data, response);
                    }
                };

                request.send(isPost ? paramString : null);
            };
        }

        var builder,
            request,
            resp,
            execFunc,
            getFeatureIdFunc,
            wwInfo = require('lib/webworks-info');
        
        //For users who wish to have a single source project across BB7 -> PB -> BB10 they will need to use webworks.js
        //To aid in this, we will fire the webworksready event on these platforms as well
        //If blackberry object already exists then we are in an older version of webworks
        if (window.blackberry) {
            _webworksReady = true;
            fireWebworksReadyEvent();
            return;
        }

        // Build out the blackberry namespace based on the APIs desired in the config.xml
        builder = require('builder');
        
        request = new XMLHttpRequest();
        request.open("GET", "http://localhost:8472/extensions/get/?hash=" + wwInfo.hash + "&version=" + wwInfo.version, true);

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 412) {
                    //Application Webworks.js does not match framework, display error to user.
                    resp = JSON.parse(request.responseText);
                    alert(resp.msg);
                } else if (request.status === 200) {
                    resp = JSON.parse(request.responseText);
                    builder.build(resp.data).into(window);
                    //At this point all of the APIs should be built into the window object
                    //Fire the webworks ready event
                    _webworksReady = true;
                    fireWebworksReadyEvent();
                }
            }
        };
        request.send(null);

        getFeatureIdFunc = function (extBasename) {
            var ext = require("manifest")[extBasename];

            if (ext) {
                return ext.namespace;
            } else {
                return null;
            }
        };

        execFunc = function (success, fail, extBasename, action, args, sync) {
            var service = getFeatureIdFunc(extBasename),
                uri = service + "/" + action,
                request = new RemoteFunctionCall(uri),
                name;

            for (name in args) {
                if (Object.hasOwnProperty.call(args, name)) {
                    request.addParam(name, args[name]);
                }
            }

            request[sync ? "makeSyncCall" : "makeAsyncCall"](success, fail);
        };

        window.webworks = {
            exec: execFunc,
            execSync: function (extBasename, action, args) {
                var result;

                execFunc(function (data, response) {
                    result = data;
                }, function (data, response) {
                    throw data;
                }, extBasename, action, args, true);

                return result;
            },
            execAsync: function (extBasename, action, args) {
                var result;

                execFunc(function (data, response) {
                    result = data;
                }, function (data, response) {
                    throw data;
                }, extBasename, action, args, false);

                return result;
            },
            successCallback: function (id, args) {
                //HACK: this will live later
                throw "not implemented";
            },
            errorCallback: function (id, args) {
                //HACK: this will live later
                throw "not implemented";
            },
            defineReadOnlyField: function (obj, field, value) {
                Object.defineProperty(obj, field, {
                    "value": value,
                    "writable": false
                });
            },
            getFeatureId: getFeatureIdFunc,
            event: require("event")
        };
    }
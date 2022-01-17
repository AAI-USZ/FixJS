function(method, url, params, contentType, data, successCallback, failureCallback)
        {
            // make sure we compute the real url
            if (Gitana.startsWith(url, "/")) {
                url = this.baseURL + url;
            }

            if (!failureCallback)
            {
                failureCallback = this.defaultFailureCallback;
            }

            /**
             * Primary success callback handler for oAuth call to server.
             *
             * @param responseObject
             * @param xhr
             */
            var onSuccess = function(responseObject, xhr)
            {
                if (successCallback)
                {
                    // call back with just the response text (or json)

                    var arg = responseObject.text;
                    if (contentType == "application/json")
                    {
                        arg = new Gitana.Response(JSON.parse(arg));
                    }

                    successCallback(arg);
                }
            };

            /**
             * Primary failure callback handler for oAuth call to server.
             *
             * @param responseObject
             * @param xhr
             */
            var onFailure = function(responseObject, xhr)
            {
                if (failureCallback)
                {
                    var httpError = {};

                    httpError["statusText"] = xhr.statusText;
                    httpError["status"] = xhr.status;

                    var message = null;
                    var stacktrace = null;

                    var arg = responseObject.text;
                    if (contentType == "application/json")
                    {
                        try
                        {
                            var obj = new Gitana.Response(JSON.parse(arg));
                            if (obj.message)
                            {
                                message = obj.message;
                            }
                            if (obj.stacktrace)
                            {
                                stacktrace = obj.stacktrace;
                            }
                        }
                        catch (e) { }
                    }
                    if (message)
                    {
                        httpError.message = message;
                    }
                    if (stacktrace)
                    {
                        httpError.stacktrace = stacktrace;
                    }

                    failureCallback(httpError);
                }
            };

            var headers = { };
            if (this.locale) {
                headers["accept-language"] = this.locale;
            }

            // ensure we have some params
            if (!params)
            {
                params = {};
            }

            // adjust url to include "full" as well as "metadata" if not included
            if (Gitana.isEmpty(params["metadata"]))
            {
                params["metadata"] = true;
            }
            if (Gitana.isEmpty(params["full"]))
            {
                params["full"] = true;
            }

            // cache buster
            var cacheBuster = new Date().getTime();
            params["cb"] = cacheBuster;

            // update URL to include params
            for (var paramKey in params)
            {
                var paramValue = params[paramKey];
                if (Gitana.isFunction(paramValue))
                {
                    paramValue = paramValue.call();
                }
                else if (Gitana.isString(paramValue))
                {
                    // NOTHING TO DO
                }
                else
                {
                    paramValue = escape(Gitana.stringify(paramValue, false));
                }

                // apply
                if (url.indexOf("?") > -1)
                {
                    url = url + "&" + paramKey + "=" + paramValue;
                }
                else
                {
                    url = url + "?" + paramKey + "=" + paramValue;
                }
            }

            return this.ajax(method, url, contentType, data, headers, onSuccess, onFailure);
        }
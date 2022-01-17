function(options)
            {
                var method = options.method || 'GET';
                var url = options.url;
                //var data = options.data || {};
                var data = options.data;
                var headers = options.headers || {};
                var success = options.success || function () {};
                var failure = options.failure || function () {};

                // make sure that all responses come back as JSON if they can (instead of XML)
                //headers["Accept"] = "application/json,*/*;q=0.8";
                headers["Accept"] = "application/json";

                var xhr = Gitana.Http.Request();
                xhr.onreadystatechange = function ()
                {
                    if (xhr.readyState === 4)
                    {
                        var regex = /^(.*?):\s*(.*?)\r?$/mg,
                            requestHeaders = headers,
                            responseHeaders = {},
                            responseHeadersString = '',
                            match;

                        if (!!xhr.getAllResponseHeaders)
                        {
                            responseHeadersString = xhr.getAllResponseHeaders();
                            while((match = regex.exec(responseHeadersString)))
                            {
                                responseHeaders[match[1]] = match[2];
                            }
                        }
                        else if(!!xhr.getResponseHeaders)
                        {
                            responseHeadersString = xhr.getResponseHeaders();
                            for (var i = 0, len = responseHeadersString.length; i < len; ++i)
                            {
                                responseHeaders[responseHeadersString[i][0]] = responseHeadersString[i][1];
                            }
                        }

                        var includeXML = false;
                        if ('Content-Type' in responseHeaders)
                        {
                            if (responseHeaders['Content-Type'] == 'text/xml')
                            {
                                includeXML = true;
                            }

                        }
                        var responseObject = {
                            text: xhr.responseText,
                            xml: (includeXML ? xhr.responseXML : ''),
                            requestHeaders: requestHeaders,
                            responseHeaders: responseHeaders
                        };

                        // handle the response
                        if ((xhr.status >= 200 && xhr.status <= 226) || xhr.status == 304 || xhr.status === 0)
                        {
                            // ok
                            success(responseObject, xhr);
                        }
                        else if (xhr.status >= 400 && xhr.status !== 0)
                        {
                            // everything what is 400 and above is a failure code
                            failure(responseObject, xhr);
                        }
                        else if (xhr.status >= 300 && xhr.status <= 303)
                        {
                            // some kind of redirect, probably to a login server
                            // indicates missing access token?
                            failure(responseObject, xhr);
                        }
                    }
                };

                xhr.open(method, url, true);

                xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
                for (var header in headers)
                {
                    xhr.setRequestHeader(header, headers[header]);
                }

                try
                {
                    xhr.send(data);
                }
                catch (e)
                {
                    console.log(e);
                }
            }
function (options) {
                var method, url, data, headers, success, failure, xhr, i,
                    headerParams, signatureMethod, signatureString, signature,
                    query = [], appendQueryString, signatureData = {}, params, withFile;

                method = options.method || 'GET';
                url = URI(options.url);
                data = options.data || {};
                headers = options.headers || {};
                success = options.success || function () {};
                failure = options.failure || function () {};

                var req_param = this.getUrlAndSetHeaders(options);
                url = req_param.url;
                headers = req_param.headers;

                xhr = Request();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var regex = /^(.*?):\s*(.*?)\r?$/mg,
                            requestHeaders = headers,
                            responseHeaders = {},
                            responseHeadersString = '',
                            match;

                        if (!!xhr.getAllResponseHeaders) {
                            responseHeadersString = xhr.getAllResponseHeaders();
                            while((match = regex.exec(responseHeadersString))) {
                                responseHeaders[match[1]] = match[2];
                            }
                        } else if(!!xhr.getResponseHeaders) {
                            responseHeadersString = xhr.getResponseHeaders();
                            for (var i = 0, len = responseHeadersString.length; i < len; ++i) {
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
                        var responseObject = {text: xhr.responseText, xml: (includeXML ? xhr.responseXML : ''), requestHeaders: requestHeaders, responseHeaders: responseHeaders};

                        // we are powerless against 3xx redirects
                        if((xhr.status >= 200 && xhr.status <= 226) || xhr.status == 304 || xhr.status === 0) {
                            success(responseObject);
                        // everything what is 400 and above is a failure code
                        } else if(xhr.status >= 400 && xhr.status !== 0) {
                            failure(responseObject);
                        }
                    }
                };

                xhr.open(method, url+'', true);

                for (i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                }

                xhr.send(query);
            }
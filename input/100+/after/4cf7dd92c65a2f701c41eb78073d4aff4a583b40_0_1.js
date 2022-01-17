function (options) {
                var method, url, data, headers, success, failure, xhr, i,
                    headerParams, signatureMethod, signatureString, signature,
                    query = [], appendQueryString, signatureData = {}, params, withFile, urlString;

                method = options.method || 'GET';
                url = URI(options.url);
                data = options.data || {};
                headers = options.headers || {};
                success = options.success || function () {};
                failure = options.failure || function () {};

                // According to the spec
                withFile = (function(){
                    var hasFile = false;
                    for(var name in data) {
                        // Thanks to the FileAPI any file entry
                        // has a fileName property
                        if(typeof data[name].fileName != 'undefined') hasFile = true;
                    }

                    return hasFile;
                })();

                appendQueryString = options.appendQueryString ? options.appendQueryString : false;

                if (oauth.enablePrivilege) {
                    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead UniversalBrowserWrite');
                }

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

                headerParams = {
                    'oauth_callback': oauth.callbackUrl,
                    'oauth_consumer_key': oauth.consumerKey,
                    'oauth_token': oauth.accessTokenKey,
                    'oauth_signature_method': oauth.signatureMethod,
                    'oauth_timestamp': getTimestamp(),
                    'oauth_nonce': getNonce(),
                    'oauth_verifier': oauth.verifier,
                    'oauth_version': OAUTH_VERSION_1_0
                };

                signatureMethod = oauth.signatureMethod;

                // Handle GET params first
                params = url.query.toObject();
                for (i in params) {
                    signatureData[i] = params[i];
                }

                // According to the OAuth spec
                // if data is transfered using
                // multipart the POST data doesn't
                // have to be signed:
                // http://www.mail-archive.com/oauth@googlegroups.com/msg01556.html
                if((!('Content-Type' in headers) || headers['Content-Type'] == 'application/x-www-form-urlencoded') && !withFile) {
                    for (i in data) {
                        signatureData[i] = data[i];
                    }
                }

                urlString = url.scheme + '://' + url.host + url.path;
                signatureString = toSignatureBaseString(method, urlString, headerParams, signatureData);

                signature = OAuth.signatureMethod[signatureMethod](oauth.consumerSecret, oauth.accessTokenSecret, signatureString);

                headerParams.oauth_signature = signature;

                if (this.realm)
                {
                    headerParams['realm'] = this.realm;
                }

                if (oauth.proxyUrl) {
                    url = URI(oauth.proxyUrl + url.path);
                }

                if(appendQueryString || method == 'GET') {
                    url.query.setQueryParams(data);
                    query = null;
                } else if(!withFile){
                    if (typeof data == 'string') {
                        query = data;
                        if (!('Content-Type' in headers)) {
                            headers['Content-Type'] = 'text/plain';
                        }
                    } else {
                        for(i in data) {
                            query.push(OAuth.urlEncode(i) + '=' + OAuth.urlEncode(data[i] + ''));
                        }
                        query = query.sort().join('&');
                        if (!('Content-Type' in headers)) {
                            headers['Content-Type'] = 'application/x-www-form-urlencoded';
                        }
                    }

                } else if(withFile) {
                    // When using FormData multipart content type
                    // is used by default and required header
                    // is set to multipart/form-data etc
                    query = new FormData();
                    for(i in data) {
                        query.append(i, data[i]);
                    }
                }

                xhr.open(method, url+'', true);

                xhr.setRequestHeader('Authorization', 'OAuth ' + toHeaderString(headerParams));
                xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
                for (i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                }

                xhr.send(query);
            }
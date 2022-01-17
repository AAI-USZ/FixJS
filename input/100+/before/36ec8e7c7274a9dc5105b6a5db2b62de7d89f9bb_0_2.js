function (url, method, data, header, callback) {
            var xhr = Ti.Network.createHTTPClient({
                timeout: 60 * 1000,
                onsendstream: function (e) {
                    Cloud.onsendstream && Cloud.onsendstream({
                        url: url,
                        progress: e.progress
                    });
                },
                ondatastream: function (e) {
                    Cloud.ondatastream && Cloud.ondatastream({
                        url: url,
                        progress: e.progress
                    });
                },
                onerror: function (e) {
                    var retVal = {};
                    var json = this.responseText;
                    try {
                        json = trim12(json);
                        if (json && json.length > 0) {
                            retVal = JSON.parse(json);
                        }
                    } catch (err) {
                        retVal = err;
                    }
                    retVal.message || (retVal.message = e.error);
                    retVal.error = true;
                    retVal.statusText = this.statusText;
                    retVal.status = this.status;
                    if (retVal.meta) {
                        retVal.metaString = JSON.stringify(retVal.meta);
                    }
                    callback(retVal);
                },
                onload: function () {
                    var json = this.responseText;
                    var data = JSON.parse(json);
                    if (data && data.meta) {
                        data.metaString = JSON.stringify(data.meta);
                        com.acs.js.sdk.utils.storeSessionId(data.meta.session_id);
                    }
                    callback(data);
                }
            });

            // for GET request only
            var requestURL = url;
            switch (method.toUpperCase()) {
                case 'DELETE':
                case 'GET':
                    var params = '';
                    for (var prop in data) {
                        if (!data.hasOwnProperty(prop)) {
                            continue;
                        }
                        params += '&' + prop + '=' + OAuth.percentEncode(data[prop]);
                    }
                    if (params.length > 0) {
                        if (url.indexOf('?') > 0) {
                            requestURL += params;
                        } else {
                            requestURL += '?' + params.substring(1);
                        }
                        data = {};
                    }
                    break;
            }

            if (Cloud.debug) {
                Ti.API.info(method + ': ' + requestURL);
                Ti.API.info('header: ' + JSON.stringify(header));
                Ti.API.info('data: ' + JSON.stringify(data));
            }

            // open the client
            xhr.open(method, requestURL);

            // set headers
            xhr.setRequestHeader('Accept-Encoding', 'gzip,deflate');
            if (header) {
                for (var prop in header) {
                    if (!header.hasOwnProperty(prop)) {
                        continue;
                    }
                    xhr.setRequestHeader(prop, header[prop]);
                }
            }

            // send the data
            xhr.send(data);
        }
function _doRequest(ajaxRequest, request, create) {
                // Prevent Android to cache request
                var url = jQuery.atmosphere.prepareURL(request.url);

                if (create) {
                    ajaxRequest.open(request.method, url, true);
                    if (request.connectTimeout > -1) {
                        request.id = setTimeout(function() {
                            if (request.requestCount == 0) {
                                ajaxRequest.abort();
                                _prepareCallback("Connect timeout", "closed", 200, request.transport);
                            }
                        }, request.connectTimeout);
                    }
                }

                if (_request.withCredentials) {
                    if ("withCredentials" in ajaxRequest) {
                        ajaxRequest.withCredentials = true;
                    }
                }

                if (!_request.dropAtmosphereHeaders) {
                    ajaxRequest.setRequestHeader("X-Atmosphere-Framework", jQuery.atmosphere.version);
                    ajaxRequest.setRequestHeader("X-Atmosphere-Transport", request.transport);
                    if (request.lastTimestamp != undefined) {
                        ajaxRequest.setRequestHeader("X-Cache-Date", request.lastTimestamp);
                    } else {
                        ajaxRequest.setRequestHeader("X-Cache-Date", 0);
                    }

                    if (request.trackMessageLength) {
                        ajaxRequest.setRequestHeader("X-Atmosphere-TrackMessageSize", "true")
                    }

                    if (request.contentType != '') {
                        ajaxRequest.setRequestHeader("Content-Type", request.contentType);
                    }
                    ajaxRequest.setRequestHeader("X-Atmosphere-tracking-id", _uuid);

                    jQuery.each(request.headers, function(name, value) {
                        var h = jQuery.isFunction(value) ? value.call(this, ajaxRequest, request, create, _response) : value;
                        if (h != null) {
                            ajaxRequest.setRequestHeader(name, h);
                        }
                    });
                }
            }
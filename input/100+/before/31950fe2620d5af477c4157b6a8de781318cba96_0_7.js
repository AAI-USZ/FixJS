function() {
                        if (_abordingConnection) {
                            return;
                        }

                        var skipCallbackInvocation = false;
                        var update = false;

                        // Remote server disconnected us, reconnect.
                        if (rq.transport == 'streaming'
                            && (rq.readyState > 2
                            && ajaxRequest.readyState == 4)) {

                            rq.readyState = 0;
                            rq.lastIndex = 0;

                            _reconnect(ajaxRequest, rq, true);
                            return;
                        }

                        rq.readyState = ajaxRequest.readyState;

                        if (ajaxRequest.readyState == 4) {
                            if (jQuery.browser.msie) {
                                update = true;
                            } else if (rq.transport == 'streaming') {
                                update = true;
                            } else if (rq.transport == 'long-polling') {
                                update = true;
                                clearTimeout(rq.id);
                            }
                        } else if (!jQuery.browser.msie && ajaxRequest.readyState == 3 && ajaxRequest.status == 200 && rq.transport != 'long-polling') {
                            update = true;
                        } else {
                            clearTimeout(rq.id);
                        }

                        if (update) {
                            var responseText = ajaxRequest.responseText;

                            if (!_request.dropAtmosphereHeaders) {
                                // Do not fail on trying to retrieve headers. Chrome migth fail with
                                // Refused to get unsafe header
                                // Let the failure happens later with a better error message
                                try {
                                    var tempDate = ajaxRequest.getResponseHeader('X-Cache-Date');
                                    if (tempDate != null || tempDate != undefined) {
                                        _request.lastTimestamp = tempDate.split(" ").pop();
                                    }
                                } catch (e) {
                                }
                            }

                            this.previousLastIndex = rq.lastIndex;
                            if (rq.transport == 'streaming') {
                                var text = responseText.substring(rq.lastIndex, responseText.length);
                                _response.isJunkEnded = true;

                                if (rq.lastIndex == 0 && text.indexOf("<!-- Welcome to the Atmosphere Framework.") != -1) {
                                    _response.isJunkEnded = false;
                                }

                                if (!_response.isJunkEnded) {
                                    var endOfJunk = "<!-- EOD -->";
                                    var endOfJunkLenght = endOfJunk.length;
                                    var junkEnd = text.indexOf(endOfJunk) + endOfJunkLenght;

                                    if (junkEnd > endOfJunkLenght && junkEnd != text.length) {
                                        _response.responseBody = text.substring(junkEnd);
                                    } else {
                                        skipCallbackInvocation = true;
                                    }
                                } else {
                                    var message = responseText.substring(rq.lastIndex, responseText.length);
                                    skipCallbackInvocation = _trackMessageSize(message, rq, _response);
                                }
                                rq.lastIndex = responseText.length;

                                if (jQuery.browser.opera) {
                                    jQuery.atmosphere.iterate(function() {
                                        if (ajaxRequest.responseText.length > rq.lastIndex) {
                                            try {
                                                _response.status = ajaxRequest.status;
                                                _response.headers = parseHeaders(ajaxRequest.getAllResponseHeaders());

                                                // HOTFIX for firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=608735
                                                if (_request.headers) {
                                                    jQuery.each(_request.headers, function(name) {
                                                        var v = ajaxRequest.getResponseHeader(name);
                                                        if (v) {
                                                            _response.headers[name] = v;
                                                        }
                                                    });
                                                }
                                            }
                                            catch(e) {
                                                _response.status = 404;
                                            }
                                            _response.state = "messageReceived";
                                            _response.responseBody = ajaxRequest.responseText.substring(rq.lastIndex);
                                            rq.lastIndex = ajaxRequest.responseText.length;

                                            _invokeCallback();
                                            if ((rq.transport == 'streaming') && (ajaxRequest.responseText.length > rq.maxStreamingLength)) {
                                                // Close and reopen connection on large data received
                                                ajaxRequest.abort();
                                                _doRequest(ajaxRequest, rq, true);
                                            }
                                        }
                                    }, 0);
                                }

                                if (skipCallbackInvocation) {
                                    return;
                                }
                            } else {
                                skipCallbackInvocation = _trackMessageSize(responseText, rq, _response);
                                rq.lastIndex = responseText.length;
                            }

                            try {
                                _response.status = ajaxRequest.status;
                                _response.headers = parseHeaders(ajaxRequest.getAllResponseHeaders());

                                // HOTFIX for firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=608735
                                if (_request.headers) {
                                    jQuery.each(_request.headers, function(name) {
                                        var v = ajaxRequest.getResponseHeader(name);
                                        if (v) {
                                            _response.headers[name] = v;
                                        }
                                    });
                                }
                            } catch(e) {
                                _response.status = 404;
                            }

                            if (rq.suspend) {
                                _response.state = _response.status == 0 ? "closed" : "messageReceived";
                            } else {
                                _response.state = "messagePublished";
                            }

                            if (!rq.executeCallbackBeforeReconnect) {
                                _reconnect(ajaxRequest, rq, false);
                            }

                            // For backward compatibility with Atmosphere < 0.8
                            if (_response.responseBody.indexOf("parent.callback") != -1) {
                                jQuery.atmosphere.log(rq.logLevel, ["parent.callback no longer supported with 0.8 version and up. Please upgrade"]);
                            }
                            _invokeCallback();

                            if (rq.executeCallbackBeforeReconnect) {
                                _reconnect(ajaxRequest, rq, false);
                            }

                            if ((rq.transport == 'streaming') && (responseText.length > rq.maxStreamingLength)) {
                                // Close and reopen connection on large data received
                                ajaxRequest.abort();
                                _doRequest(ajaxRequest, rq, true);
                            }
                        }
                    }
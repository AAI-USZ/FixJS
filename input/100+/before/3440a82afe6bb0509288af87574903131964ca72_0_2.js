function _executeWebSocket(webSocketOpened) {

                _response.transport = "websocket";

                var location = _buildWebSocketUrl(_request.url);
                var closed = false;

                jQuery.atmosphere.log(_request.logLevel, ["Invoking executeWebSocket"]);
                if (_request.logLevel == 'debug') {
                    jQuery.atmosphere.debug("Using URL: " + location);
                }

                if (webSocketOpened) {
                    _open('re-opening', "websocket", _request);
                }

                if (!_request.reconnect) {
                    if (_websocket != null) {
                        _websocket.close();
                    }
                    return;
                }

                _websocket = _getWebSocket(location);

                if (_request.connectTimeout > 0) {
                    _request.id = setTimeout(function() {
                        if (!webSocketOpened) {
                            var _message = {
                                code : 1002,
                                reason : "",
                                wasClean : false
                            };
                            _websocket.onclose(_message);
                            // Close it anyway
                            try {
                                _websocket.close();
                            } catch (e) {
                            }
                        }
                    }, _request.connectTimeout);
                }

                _websocket.onopen = function(message) {
                    if (_request.logLevel == 'debug') {
                        jQuery.atmosphere.debug("Websocket successfully opened");
                    }

                    if (!webSocketOpened) {
                        _open('opening', "websocket", _request);
                    }

                    webSocketOpened = true;

                    if (_request.method == 'POST') {
                        _response.state = "messageReceived";
                        _websocket.send(_request.data);
                    }
                };

                _websocket.onmessage = function(message) {
                    if (message.data.indexOf("parent.callback") != -1) {
                        jQuery.atmosphere.log(_request.logLevel, ["parent.callback no longer supported with 0.8 version and up. Please upgrade"]);
                    }

                    _response.state = 'messageReceived';
                    _response.status = 200;

                    var message = message.data;
                    var skipCallbackInvocation = _trackMessageSize(message, _request, _response);

                    if (!skipCallbackInvocation) {
                        _invokeCallback();
                        _response.responseBody = '';
                    }
                };

                _websocket.onerror = function(message) {
                    clearTimeout(_request.id)
                };

                _websocket.onclose = function(message) {
                    if (closed) return

                    var reason = message.reason;
                    if (reason === "") {
                        switch (message.code) {
                            case 1000:
                                reason = "Normal closure; the connection successfully completed whatever purpose for which " +
                                    "it was created.";
                                break;
                            case 1001:
                                reason = "The endpoint is going away, either because of a server failure or because the " +
                                    "browser is navigating away from the page that opened the connection.";
                                break;
                            case 1002:
                                reason = "The endpoint is terminating the connection due to a protocol error.";
                                break;
                            case 1003:
                                reason = "The connection is being terminated because the endpoint received data of a type it " +
                                    "cannot accept (for example, a text-only endpoint received binary data).";
                                break;
                            case 1004:
                                reason = "The endpoint is terminating the connection because a data frame was received that " +
                                    "is too large.";
                                break;
                            case 1005:
                                reason = "Unknown: no status code was provided even though one was expected.";
                                break;
                            case 1006:
                                reason = "Connection was closed abnormally (that is, with no close frame being sent).";
                                break;
                        }
                    }

                    jQuery.atmosphere.warn("Websocket closed, reason: " + reason);
                    jQuery.atmosphere.warn("Websocket closed, wasClean: " + message.wasClean);

                    _response.state = 'closed';
                    _response.responseBody = "";
                    _response.status = !webSocketOpened ? 501 : 200;
                    _invokeCallback();
                    clearTimeout(_request.id)

                    closed = true;

                    if (_abordingConnection) {
                        jQuery.atmosphere.log(_request.logLevel, ["Websocket closed normally"]);
                    } else if (!webSocketOpened) {
                        _reconnectWithFallbackTransport("Websocket failed. Downgrading to Comet and resending");

                    } else if (_request.reconnect && _response.transport == 'websocket') {
                        if (_request.reconnect && _requestCount++ < _request.maxRequest) {
                            _request.requestCount = _requestCount;
                            _response.responseBody = "";
                            _executeWebSocket(true);
                        } else {
                            jQuery.atmosphere.log(_request.logLevel, ["Websocket reconnect maximum try reached " + _request.requestCount]);
                            jQuery.atmosphere.warn("Websocket error, reason: " + message.reason);
                            _onError();
                        }
                    }
                };
            }
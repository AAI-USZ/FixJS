function _pushResponse(response, state, listener) {

                        if (state == "messageReceived") {
                            // Invoke onOpen only when the handshake occurs.
                            if (!_handshakeDone) {
                                if (response.getStatus() < 400) {
                                    if (typeof(listener.onOpen) != 'undefined') {
                                        try {
                                            listener.onOpen(response);
                                        } catch (err) {
                                            if (jQuery.swaggersocket._logLevel == 'debug') {
                                                jQuery.atmosphere.debug(err.type)
                                            }
                                        }
                                        _handshakeDone = true;
                                    } else {
                                        if (typeof(listener.onError) != 'undefined') {
                                            try {
                                                listener.onError(response);
                                            } catch (err) {
                                                if (jQuery.swaggersocket._logLevel == 'debug') {
                                                    jQuery.atmosphere.debug(err.type)
                                                }
                                            }
                                        }
                                    }

                                    if (typeof(_openFunction) != 'undefined') {
                                        try {
                                            _openFunction(_self, response);
                                        } catch (err) {
                                            if (jQuery.swaggersocket._logLevel == 'debug') {
                                                jQuery.atmosphere.debug(err.type)
                                            }
                                        }
                                    }
                                }
                            } else {
                                switch (Object.prototype.toString.call(response)) {
                                    case "[object Array]":
                                        if (typeof(listener.onResponses) != 'undefined') {
                                            try {
                                                listener.onResponses(response);
                                            } catch (err) {
                                                if (jQuery.swaggersocket._logLevel == 'debug') {
                                                    jQuery.atmosphere.debug(err.type)
                                                }
                                            }
                                        }
                                        return;
                                    default:
                                        if (response.getStatus() < 400 && typeof(listener.onResponse) != 'undefined') {
                                            try {
                                                listener.onResponse(response);
                                            } catch (err) {
                                                if (jQuery.swaggersocket._logLevel == 'debug') {
                                                    jQuery.atmosphere.debug(err.type)
                                                }
                                            }
                                        } else if (typeof(listener.onError) != 'undefined') {
                                            try {
                                                listener.onError(response);
                                            } catch (err) {
                                                if (jQuery.swaggersocket._logLevel == 'debug') {
                                                    jQuery.atmosphere.debug(err.type)
                                                }
                                            }
                                        }
                                        break;
                                }

                            }
                        }
                    }
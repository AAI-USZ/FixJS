function _pushResponse(response, state, listener) {

                        if (state == "messageReceived") {
                            // Invoke onOpen only when the handshake occurs.
                            if (!_handshakeDone) {
                                if (response.getStatus() < 400) {
                                    if (typeof(listener.onOpen) != 'undefined') {
                                        listener.onOpen(response);
                                    }
                                    _handshakeDone = true;
                                } else {
                                     if (typeof(listener.onError) != 'undefined') {
                                        listener.onError(response);
                                    }
                                }

                                if (typeof(_openFunction) != 'undefined') {
                                    _openFunction(_self, response);
                                }
                            } else {
                                switch (Object.prototype.toString.call(response)) {
                                    case "[object Array]":
                                        if (typeof(listener.onResponses) != 'undefined') {
                                            listener.onResponses(response);
                                        }
                                        return;
                                    default:
                                        if (response.getStatus() < 400 && typeof(listener.onResponse) != 'undefined') {
                                            listener.onResponse(response);
                                        } else if (typeof(listener.onError) != 'undefined') {
                                            listener.onError(response);
                                        }
                                        break;
                                }
                            }
                        }
                    }
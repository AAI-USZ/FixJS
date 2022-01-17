function _invokeCallback() {
                var call = function (index, func) {
                    func(_response);
                };

                if (!isLocalSocket && _localSocketF != null) {
                    _localSocketF(_response.responseBody);
                }

                var messages = typeof(_response.responseBody) == 'string' ? _response.responseBody.split(_request.messageDelimiter) : new Array(_response.responseBody);
                for (var i = 0; i < messages.length; i++) {

                    if (messages.length > 1 && messages[i].length == 0) {
                        continue;
                    }
                    _response.responseBody = jQuery.trim(messages[i]);

                    // Ugly see issue 400.
                    if (_response.responseBody.length == 0 && _response.transport == 'streaming' && _response.state == "messageReceived") {
                        var ua = navigator.userAgent.toLowerCase();
                        var isAndroid = ua.indexOf("android") > -1;
                        if (isAndroid) {
                            continue;
                        }
                    }

                    _invokeFunction(_response);

                    // Invoke global callbacks
                    if (jQuery.atmosphere.callbacks.length > 0) {
                        if (_request.logLevel == 'debug') {
                            jQuery.atmosphere.debug("Invoking " + jQuery.atmosphere.callbacks.length + " global callbacks: " + _response.state);
                        }
                        try {
                            jQuery.each(jQuery.atmosphere.callbacks, call);
                        } catch (e) {
                            jQuery.atmosphere.log(_request.logLevel, ["Callback exception" + e]);
                        }
                    }

                    // Invoke request callback
                    if (typeof(_request.callback) == 'function') {
                        if (_request.logLevel == 'debug') {
                            jQuery.atmosphere.debug("Invoking request callbacks");
                        }
                        try {
                            _request.callback(_response);
                        } catch (e) {
                            jQuery.atmosphere.log(_request.logLevel, ["Callback exception" + e]);
                        }
                    }
                }

            }
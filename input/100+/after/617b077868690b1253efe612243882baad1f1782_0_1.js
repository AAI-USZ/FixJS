function _invokeCallback() {
                var call = function (index, func) {
                    func(_response);
                };

                if (_response.state == 'messageReceived' && _buffering(_response.responseBody, _request, _response)) return;

                var messages = typeof(_response.responseBody) == 'string' ? _response.responseBody.split(_request.messageDelimiter) : new Array(_response.responseBody);
                for (var i = 0; i < messages.length; i++) {

                    if (messages.length > 1 && messages[i].length == 0) {
                        continue;
                    }
                    _response.responseBody = jQuery.trim(messages[i]);
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
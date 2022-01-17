function(message) {
                    _response.state = 'messageReceived';
                    _response.status = 200;

                    var message = message.data;
                    var skipCallbackInvocation = _trackMessageSize(message, _request, _response);

                    if (jQuery.trim(message).length == 0) {
                        skipCallbackInvocation = true;
                    }

                    if (!skipCallbackInvocation) {
                        _invokeCallback();
                        _response.responseBody = '';
                    }
                }
function _prepareCallback(messageBody, state, errorCode, transport) {

                if (state == "messageReceived") {
                    if (_trackMessageSize(messageBody, _request, _response)) return;
                }

                _response.transport = transport;
                _response.status = errorCode;

                // If not -1, we have buffered the message.
                if (_response.expectedBodySize == -1) {
                    _response.responseBody = messageBody;
                }
                _response.state = state;

                _invokeCallback();
            }
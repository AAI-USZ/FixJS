function(message) {

                    clearTimeout(_request.id);
                    _response.state = 'closed';
                    _response.responseBody = "";
                    _response.status = !sseOpened ? 501 : 200;
                    _invokeCallback();

                    if (_abordingConnection) {
                        jQuery.atmosphere.log(_request.logLevel, ["SSE closed normally"]);
                    } else if (!sseOpened) {
                        _reconnectWithFallbackTransport("SSE failed. Downgrading to fallback transport and resending");
                    } else if (_request.reconnect && (_response.transport == 'sse')) {
                        if (_requestCount++ < _request.maxRequest) {
                            _request.requestCount = _requestCount;
                            _response.responseBody = "";
                            _executeSSE(true);
                        } else {
                            _sse.close();
                            jQuery.atmosphere.log(_request.logLevel, ["SSE reconnect maximum try reached " + _request.requestCount]);
                            _onError();
                        }
                    }
                }
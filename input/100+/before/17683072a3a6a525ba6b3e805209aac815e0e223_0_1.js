function _execute() {
                // Shared across multiple tabs/windows.
                if (_request.shared) {
                    share();
                    var local = _local(_request);
                    if (local != null && local.open(_request)) {
                        // Local connection.
                        isLocalSocket = true;
                        return;
                    } else {
                        isLocalSocket = false;
                    }
                }

                if (_request.transport != 'websocket' && _request.transport != 'sse') {
                    _open('opening', _request.transport, _request);
                    _executeRequest();

                } else if (_request.transport == 'websocket') {
                    if (!_supportWebsocket()) {
                        _reconnectWithFallbackTransport("Websocket is not supported, using request.fallbackTransport (" + _request.fallbackTransport + ")");
                    } else {
                        _executeWebSocket(false);
                    }
                } else if (_request.transport == 'sse') {
                    if (!_supportSSE()) {
                        _reconnectWithFallbackTransport("Server Side Events(SSE) is not supported, using request.fallbackTransport (" + _request.fallbackTransport + ")");
                    } else {
                        _executeSSE(false);
                    }
                }
            }
function _execute() {
                // Shared across multiple tabs/windows.
                if (_request.shared && !jQuery.browser.opera) {
                    _localStorageService = _local(_request);
                    if (_localStorageService != null) {
                        if (_request.logLevel == 'debug') {
                            jQuery.atmosphere.debug("Storage service available. All communication will be local");
                        }
                        if (_localStorageService.open(_request)) {
                            // Local connection.
                            return;
                        }
                    }

                    if (_request.logLevel == 'debug') {
                        jQuery.atmosphere.debug("No Storage service available.");
                    }
                    // Wasn't local or an error occured
                    _localStorageService = null;
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
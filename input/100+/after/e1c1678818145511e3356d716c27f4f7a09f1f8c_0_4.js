function _open(state, transport, request) {
                if (_request.shared && transport != 'local' && !jQuery.browser.opera) {
                    share();
                }

                if (_storageService != null) {
                    _storageService.set("opened", true);
                }

                request.close = function() {
                    _close();
                    request.reconnect = false;
                }

                _response.request = request;
                var prevState = _response.state;
                _response.state = state;
                _response.status = 200;
                var prevTransport = _response.transport;
                _response.transport = transport;
                _invokeCallback();
                _response.state = prevState;
                _response.transport = prevTransport;
            }
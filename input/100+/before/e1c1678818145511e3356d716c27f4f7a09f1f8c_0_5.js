function _close() {
                _request.reconnect = false;
                _response.request = _request;
                _subscribed = false;
                _abordingConnection = true;
                _response.state = 'unsubscribe';
                _response.responseBody = "";
                _response.status = 408;
                _invokeCallback();

                _clearState();


                // Are we the parent that hold the real connection.
                if (_localStorageService == null && _localSocketF != null) {
//					// The heir is the parent unless _abordingConnection
                    _storageService.signal("close", {reason: "", heir: !_abordingConnection ? guid : _storageService.get("children")[0]});
                    document.cookie = encodeURIComponent("socket-"+_request.url) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }

                if (_storageService != null) {
                    _storageService.close();
                }


                if (_localStorageService != null) {
                    _localStorageService.close();
                }
            }
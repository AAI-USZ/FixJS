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
            }
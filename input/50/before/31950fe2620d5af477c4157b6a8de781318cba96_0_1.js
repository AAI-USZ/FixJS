function _init() {
                _uuid = 0;
                _subscribed = true;
                _abordingConnection = false;
                _requestCount = 0;

                _websocket = null;
                _sse = null;
                _activeRequest = null;
                _ieStream = null;
            }
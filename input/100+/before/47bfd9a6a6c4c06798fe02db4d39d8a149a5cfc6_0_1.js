function _getPushRequest(message) {
                var msg = _getStringMessage(message);

                var rq = {
                    connected: false,
                    timeout: 60000,
                    method: 'POST',
                    url: _request.url,
                    contentType : _request.contentType,
                    headers: {},
                    reconnect : true,
                    callback: null,
                    data : msg,
                    suspend : false,
                    maxRequest : 60,
                    logLevel : 'info',
                    requestCount : 0,
                    transport: 'polling',
                    attachHeadersAsQueryString: true,
                    uuid : _request.uuid
                };

                if (typeof(message) == 'object') {
                    rq = jQuery.extend(rq, message);
                }

                return rq;
            }
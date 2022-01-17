function (request, response, options) {
    options = options || {};
    options.expires = options.expires || MAX_AGE;
    options.path = options.path || '';
    options.domain = options.domain || '';

    var sessionId = request.get("NODESESSID", "string");
    if (sessionId == '') {
        //console.log("session from cookie");
        if (request.cookie.NODESESSID) {
            sessionId = request.cookie.NODESESSID;
        } else {
            sessionId = _generateSessionId(request.ip);
        }

        response.setCookie(
            "NODESESSID", 
            sessionId, 
            {expires : options.expires, path: options.path, domain: options.domain}
        );
    }

    if (sessionId in sessionData) { //flush timestamp
        sessionData[sessionId].timestamp = new Date().getTime();
    } else { //new session
        sessionData[sessionId] = {
            data: {},
            timestamp: new Date().getTime()
        };
    }
    request.session = sessionData[sessionId].data;
}
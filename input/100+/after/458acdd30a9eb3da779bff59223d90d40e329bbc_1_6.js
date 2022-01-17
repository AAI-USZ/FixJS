function sync_req(type, params0, path_template) {
    var params = collapse_multifields(params0);
    var path;
    try {
        path = fill_path_template(path_template, params);
    } catch (e) {
        error_popup('warn', e);
        return false;
    }
    var req = xmlHttpRequest();
    req.open(type, '/api' + path, false);
    req.setRequestHeader('content-type', 'application/json');
    try {
        if (type == 'GET')
            req.send(null);
        else
            req.send(JSON.stringify(params));
    }
    catch (e) {
        if (e.number == 0x80004004) {
            // 0x80004004 means "Operation aborted."
            // http://support.microsoft.com/kb/186063
            // MSIE6 appears to do this in response to HTTP 204.
        }
    }

    if (req.status == 400 || req.status == 404) {
        var reason = JSON.parse(req.responseText).reason;
        if (typeof(reason) != 'string') reason = JSON.stringify(reason);
        error_popup('warn', reason);
        return false;
    }

    // 1223 == 204 - see http://www.enhanceie.com/ie/bugs.asp
    // MSIE7 and 8 appear to do this in response to HTTP 204.
    if (req.status >= 400 && req.status != 1223) {
        debug("Got response code " + req.status + " with body " +
              req.responseText);
    }

    if (type == 'GET')
        return req.responseText;
    else
        return true;
}
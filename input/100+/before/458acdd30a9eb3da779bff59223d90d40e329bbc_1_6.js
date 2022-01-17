function sync_req(type, params, path_template) {
    var path = fill_path_template(path_template, params);
    var req = xmlHttpRequest();
    req.open(type, '/api' + path, false);
    req.setRequestHeader('content-type', 'application/json');
    try {
        if (params["arguments"] == "") params["arguments"] = []; // TODO
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

    if (req.status == 400) {
        error_popup(JSON.stringify(JSON.parse(req.responseText).reason));
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
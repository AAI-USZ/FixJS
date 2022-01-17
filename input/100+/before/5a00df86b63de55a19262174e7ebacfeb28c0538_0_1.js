function rebuildRequest(req) {
    var originalURL = req.params.service + "/" + 
            req.params.action + "/" + 
            (req.params.ext ? req.params.ext  : "") +
            (req.params.method ? "/" + req.params.method : "") +
            (req.params.args ? "?" + req.params.args : ""),
        tokens = originalURL.split('/'),
        //Handle the case where the method is multi-level
        finalToken = (tokens[1] && tokens.length > 2) ? tokens.slice(1).join('/') : tokens[1];

    return {
        params : {
            service : DEFAULT_SERVICE,
            action : DEFAULT_ACTION,
            ext : tokens[0],
            method : (finalToken && finalToken.indexOf("?") >= 0) ? finalToken.split("?")[0] : finalToken,
            args : (finalToken && finalToken.indexOf("?") >= 0) ? finalToken.split("?")[1] : null
        },
        body : req.body,
        origin : req.origin
    };
}
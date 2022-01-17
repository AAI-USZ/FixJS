function (name, req, onLoad, config) {
        //Using special require.nodeRequire, something added by r.js.
        if (globalRequire && globalRequire.nodeRequire)
            onLoad(globalRequire.nodeRequire('fs').readFileSync(req.toUrl(name), 'utf8'));
        else
            require("ace/lib/net").get(req.toUrl(name), onLoad);
    }
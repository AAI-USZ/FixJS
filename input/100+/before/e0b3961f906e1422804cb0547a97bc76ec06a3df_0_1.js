function reportXmppError(req, res, errorStanza) {
    var error = errorStanza.getChild('error');
    if (error) {
        if (error.getChild('not-authorized'))
            res.send(401);
        else if (error.getChild('not-allowed')) {
            if (req.user)
                res.send(403);
            else
                auth.respondNotAuthorized(res);
        }
        else if (error.getChild('item-not-found'))
            res.send(404);
    }
    res.send(500);
}
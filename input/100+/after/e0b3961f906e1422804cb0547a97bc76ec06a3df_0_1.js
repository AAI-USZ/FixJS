function reportXmppError(req, res, errorStanza) {
    var error = errorStanza.getChild('error');
    if (error) {
        if (error.getChild('not-authorized') ||
            error.getChild('not-allowed') ||
            error.getChild('forbidden')) {
            res.send(req.user ? 403 : 401);
        }
        else if (error.getChild('item-not-found'))
            res.send(404);
    }
    res.send(500);
}
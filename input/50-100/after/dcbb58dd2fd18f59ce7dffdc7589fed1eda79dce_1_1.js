function redirectToMonitored(req, res, cxt) {
    var options = cxt.options,
        match = cxt.match,
        m = monitored;
    res.setHeader("Location", "/swallow/make/" + m.factory + '.' + m.type + '.mon');
    res.writeHead(302);
    res.end();
}
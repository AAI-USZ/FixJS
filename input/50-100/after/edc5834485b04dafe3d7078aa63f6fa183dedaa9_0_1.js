function redirectRoot(req, res, next) {
        if (url.parse(req.url).pathname == '/' && req.originalUrl.slice(-1) != '/') {
            res.redirect('/', 301);
        } else {
            next();
        }
    }
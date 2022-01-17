function(req, res, done) {
    res.locals.session = req.session;
    res.locals.board = {
        name    : options.name,
        domain  : options.domain,
        version : options.version
    };
    res.locals.board.authenticated = false;
    if (req.isAuthenticated()) {
        res.locals.board.authenticated = true;
        res.locals.board.user = req.user;
    }
    res.locals.board.flash = {
        error : req.flash('error'),
        info : req.flash('info')
    };
    for( var i =0;i< res.locals.board.flash.length;i++ ) {
        console.log(res.locals.board.flash[i]);
    }
    res.locals.board.uploadMethod = options.upload.method;
    done();
}
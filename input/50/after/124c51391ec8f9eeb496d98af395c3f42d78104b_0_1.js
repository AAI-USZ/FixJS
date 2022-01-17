function(err, data) {
        if(err) return next(err);
        console.log('loaded template');
        res.body = exports.replacePlayer(res.body, data, vid);
        next();
    }
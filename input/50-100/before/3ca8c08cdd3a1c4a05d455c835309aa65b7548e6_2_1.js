function(req, res, next) {
        if (req.user) {
            if (req.user.confirmed || noConfirm) {
                view(req, res, next);
            } else {
                res.redirect('/confirm', 307);
            }
        } else {
            res.redirect('/login', 307);
        }
    }
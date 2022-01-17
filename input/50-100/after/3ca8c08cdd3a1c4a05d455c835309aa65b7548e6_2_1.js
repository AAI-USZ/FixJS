function(req, res, next) {
        if (req.user) {
            if (req.user.confirmed || noConfirm) {
                view(req, res, next);
            } else {
                res.redirect('/confirm.html', 303);
            }
        } else {
            res.redirect('/login.html', 303);
        }
    }
function(error, user) {
        if (user != null)
        {
            // User found
            // TODO: validate password
            req.session.userid = req.param('userid');
            res.redirect('/Warble')
        }
        else
        {
            // Not valid, request retry
            res.render('user_login.jade', { locals: {
                title: 'Login failed, try again',
                userid: req.param('userid'),
                password: ''
            }
            });
        }
    }
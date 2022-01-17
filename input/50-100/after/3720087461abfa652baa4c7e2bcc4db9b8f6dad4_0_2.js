function(error, resp) {
                if(error){
                    console.log('Mail Error (app.js:370):'+error);
                    req.flash('error', error);
                    res.redirect('/login');
                } else {
                    req.flash('info', "You've been sent a confirmation email, check it for instructions.");
                    res.redirect('/login');
                }
            }
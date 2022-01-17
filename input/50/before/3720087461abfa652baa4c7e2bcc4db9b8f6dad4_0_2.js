function(error, result) {
                if (error) console.log('Verify Error:'+error);
                req.flash('info', "Account verified, you may now login.");
                res.redirect('/login');
            }
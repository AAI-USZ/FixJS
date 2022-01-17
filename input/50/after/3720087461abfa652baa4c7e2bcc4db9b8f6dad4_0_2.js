function(error, result) {
                if (error) console.log('Verify Error (app.js:389):'+error);
                req.flash('info', "Account verified, you may now login.");
                res.redirect('/login');
            }
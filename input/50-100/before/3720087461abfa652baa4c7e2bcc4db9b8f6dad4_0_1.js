function(error, result) {
                    if (error) {
                        console.log(error);
                        req.flash('error', req.flash('info', 'Changes applied successfully!'));
                    } else {
                        req.flash('info', 'Changes applied successfully!');

                        //Do a rebuild on tags now
                        tagProvider.rebuildCount(function(error, result){console.log(error);});
                        tagProvider.current = false;
                    }
                    res.redirect('/post/'+id);
                }
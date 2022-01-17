function(error, result) {
                    if (error) {
                        console.log('Image Edit Error (app.js:249): '+error);
                        req.flash('error', req.flash('info', 'Changes applied successfully!'));
                    } else {
                        req.flash('info', 'Changes applied successfully!');

                        //Do a rebuild on tags now
                        tagProvider.rebuildCount(function(error, result){console.log('Tag Rebuild Error (app.js:255): '+error);});
                        tagProvider.current = false;
                    }
                    res.redirect('/post/'+id);
                }
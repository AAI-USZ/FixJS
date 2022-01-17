function(req, res) {
       if (req.query.q) {
            app.providers.commentProvider.search(req.query.q, 1, 15, function(error, comments){
                var search = [];

                for (var i = 0; i < comments.length; i++) {
                    search.push(comments[i].a);
                }
                app.providers.imageProvider.getBatch(search, function(error,results){
                    for (var i = 0; i < comments.length; i++ ) {
                        for (var j = 0; j < results.length; j++) {
                            if (results[j].a == comments[i].a) results[j].c = comments[i].c;
                        }
                    }
                    res.render('view/comment/search', {
                        active: 'comment/',
                        comments: results,
                        search:true
                    });
                });
            });
       } else {
           res.render('view/comment/search', {
               active: 'comment/',
               comments: [],
               search: false
           });
       }
    }
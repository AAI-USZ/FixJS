function(app){
    app.get('/comment', function(req, res) {
        app.providers.commentProvider.page(1, app.twi.options.resultsPerPage, function(error, comments) {
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
                res.render('view/comment/list', {
                    active: 'comment/',
                    comments: results
                });
            });
        });
    });
}
function(err) {
            fn.update_repo(options, function(err) {
                fn.load_articles(options, function(articles) {
                    articles = articles.sort(function(a,b) {
                        return b.date - a.date;
                    });
                    fn.render_rss(options, articles, function() {
                        fn.render_blog(options, articles, cb);
                    });
                });
            });
		}
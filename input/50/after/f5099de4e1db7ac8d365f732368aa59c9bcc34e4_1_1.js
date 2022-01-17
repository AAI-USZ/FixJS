function(err) {
                glog.load_articles(options, function(articles) {
                    assert.equal(articles.length, 2);
                    done();
                });
            }
function(done) {
        glog.load_configs(function(options) {
            options.plugins = ['example'];
			glog.load_articles(options, function(articles) {
				glog.render_blog(options, articles, function() {
					assert.equal(articles[0].title, 'Title changed by plugin');
					done();
				});
			});
        });
    }
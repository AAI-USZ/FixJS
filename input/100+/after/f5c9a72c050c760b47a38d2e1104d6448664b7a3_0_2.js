function(callback, error_callback) {
        var self = this;
        var selected = this.feeds.selected();

        var pre_callback = function(feeds, subscriptions) {
            self.flags['favicons_fetching'] = self.feeds.any(function(feed) { return feed.get('favicons_fetching'); });

            self.folders.reset(_.compact(subscriptions.folders));
            self.starred_count = subscriptions.starred_count;
            self.social_feeds.reset(subscriptions.social_feeds);
            self.user_profile.set(subscriptions.social_profile);
            self.social_services = subscriptions.social_services;
            
            if (selected) {
                self.feeds.get(selected).set('selected', true);
            }
            if (!_.isEqual(self.favicons, {})) {
                self.feeds.each(function(feed) {
                    if (self.favicons[feed.id]) {
                        feed.set('favicon', self.favicons[feed.id]);
                    }
                });
            }
            
            self.flags['has_chosen_feeds'] = self.feeds.has_chosen_feeds();
            
            self.feeds.trigger('reset');
            
            callback && callback();
        };
        
        this.feeds.fetch({
            success: pre_callback,
            error: error_callback
        });
    }
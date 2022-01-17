function($iframe, options) {
        var self = this;
        options = options || {};
        if (!$iframe) $iframe = this.$el.contents();
        if (options.reset_timer) this.counts['positions_timer'] = 0;
        
        this.flags['iframe_fetching_story_locations'] = true;
        this.flags['iframe_story_locations_fetched'] = false;

        $.extend(this.cache, {
            'story_misses': 0,
            'iframe_stories': {},
            'iframe_story_positions': {},
            'iframe_story_positions_keys': []
        });
        
        NEWSBLUR.assets.stories.any(_.bind(function(story, i) {
            if (story.get('story_feed_id') == NEWSBLUR.reader.active_feed || 
                "social:" + story.get('social_user_id') == NEWSBLUR.reader.active_feed) {
                var $story = this.find_story_in_feed_iframe(story, $iframe);
                // NEWSBLUR.log(['Fetching story', i, story.get('story_title'), $story]);
            
                if (self.cache['story_misses'] > 5) {
                    // NEWSBLUR.log(['iFrame view entirely loaded', self.cache['story_misses'], self.cache.iframe_stories]);
                    self.flags['iframe_story_locations_fetched'] = true;
                    self.flags['iframe_fetching_story_locations'] = false;
                    clearInterval(self.flags['iframe_scroll_snapback_check']);
                    return true;
                }
            } else if (story && story.get('story_feed_id') != NEWSBLUR.reader.active_feed &&
                       "social:" + story.get('social_user_id') != NEWSBLUR.reader.active_feed) {
                NEWSBLUR.log(['Switched off iframe early', NEWSBLUR.reader.active_feed, story.get('story_feed_id'), story.get('social_user_id')]);
                return true;
            }
        }, this));
        
        NEWSBLUR.log(['Original view entirely loaded', _.keys(self.cache.iframe_stories).length + " stories", this.counts['positions_timer']/1000 + " sec delay"]);
        
        this.counts['positions_timer'] = Math.max(this.counts['positions_timer']*2, 1000);
        clearTimeout(this.flags['next_fetch']);
        this.flags['next_fetch'] = _.delay(_.bind(this.fetch_story_locations_in_story_frame, this),
                                           this.counts['positions_timer']);
    }
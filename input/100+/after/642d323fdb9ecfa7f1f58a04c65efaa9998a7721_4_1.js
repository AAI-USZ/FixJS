function() {
        var self = this;
        var stories = NEWSBLUR.assets.stories;
        
        // NEWSBLUR.log(['Prefetching Feed', this.flags['feed_view_positions_calculated'], this.flags.feed_view_images_loaded, (_.keys(this.flags.feed_view_images_loaded).length > 0 || this.cache.feed_view_story_positions_keys.length > 0), _.keys(this.flags.feed_view_images_loaded).length, _.values(this.flags.feed_view_images_loaded), this.is_feed_loaded_for_location_fetch()]);

        if (!NEWSBLUR.assets.stories.size()) return;
        
        if (!this.flags['feed_view_positions_calculated']) {
            
            $.extend(this.cache, {
                'feed_view_story_positions': {},
                'feed_view_story_positions_keys': []
            });
        
            NEWSBLUR.assets.stories.any(_.bind(function(story) {
                this.determine_feed_view_story_position(story);
                var $story = story.story_view.$el;
                if (!$story || !$story.length || this.flags['feed_view_positions_calculated']) {
                    return true;
                }
            }, this));
            
            clearTimeout(this.flags['prefetch']);
            this.flags['prefetch'] = setTimeout(_.bind(function() {
                if (!this.flags['feed_view_positions_calculated']) {
                    this.prefetch_story_locations_in_feed_view();
                }
            }, this), 2000);
        } 
        
        if (this.is_feed_loaded_for_location_fetch()) {
            this.fetch_story_locations_in_feed_view({'reset_timer': true});
        } else {
            NEWSBLUR.log(['Still loading feed view...', _.keys(this.flags.feed_view_images_loaded).length, this.cache.feed_view_story_positions_keys.length, this.flags.feed_view_images_loaded]);
        }
    }
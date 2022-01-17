function(story, options) {
        options = options || {};
        if (!story || !story.story_view) return;
        var $story = story.story_view.$el;

        if (NEWSBLUR.assets.preference('feed_view_single_story')) return;
        if (!NEWSBLUR.assets.preference('animations')) options.immediate = true;
        if (options.scroll_to_comments) {
            $story = $('.NB-feed-story-comments', $story);
        }
        
        if (options.only_if_hidden && this.$el.isScrollVisible($story, true)) {
            return;
        }
        
        clearTimeout(NEWSBLUR.reader.locks.scrolling);
        NEWSBLUR.reader.flags.scrolling_by_selecting_story_title = true;
        this.$el.scrollable().stop();
        this.$el.scrollTo($story, { 
            duration: options.immediate ? 0 : 340,
            axis: 'y', 
            easing: 'easeInOutQuint', 
            offset: options.scroll_offset || 0,
            queue: false, 
            onAfter: function() {
                NEWSBLUR.reader.locks.scrolling = setTimeout(function() {
                    NEWSBLUR.reader.flags.scrolling_by_selecting_story_title = false;
                }, 100);
            }
        });
    }
function(story, options) {
        var $iframe = this.$el;
        var $story = this.find_story_in_feed_iframe(story);
        options = options || {};
        
        if (!story) return;
        
        if (options.only_if_hidden && this.$el.isScrollVisible($story, true)) {
            return;
        }
        
        if (!NEWSBLUR.assets.preference('animations') ||
            NEWSBLUR.reader.story_view == 'feed' ||
            NEWSBLUR.reader.story_view == 'story' ||
            NEWSBLUR.reader.flags['page_view_showing_feed_view']) options.immediate = true;

        // NEWSBLUR.log(["Scroll in Original", story.get('story_title'), options]);
        
        if ($story && $story.length) {
            if (!options.immediate) {
                clearTimeout(NEWSBLUR.reader.locks.scrolling);
                NEWSBLUR.reader.flags['scrolling_by_selecting_story_title'] = true;
            }
            
            $iframe.scrollable().stop();
            $iframe.scrollTo($story, { 
                duration: options.immediate ? 0 : 380,
                axis: 'y', 
                easing: 'easeInOutQuint', 
                offset: -24, 
                queue: false, 
                onAfter: function() {
                    if (options.immediate) return;
                    
                    NEWSBLUR.reader.locks.scrolling = setTimeout(function() {
                        NEWSBLUR.reader.flags['scrolling_by_selecting_story_title'] = false;
                    }, 100);
                }
            });

            var parent_scroll = $story.parents('.NB-feed-story-view').scrollTop();
            var story_offset = $story.offset().top;

            return story_offset + parent_scroll;
        }

        return false;
    }
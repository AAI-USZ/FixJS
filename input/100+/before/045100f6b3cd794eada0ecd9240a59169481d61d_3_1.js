function(story, is_temporary) {
        if (!story) story = NEWSBLUR.reader.active_story;
        var feed = NEWSBLUR.assets.get_feed(story.get('story_feed_id'));

        if ((feed && feed.get('disabled_page')) || 
            NEWSBLUR.utils.is_url_iframe_buster(story.get('story_permalink'))) {
            if (!is_temporary) {
                NEWSBLUR.reader.switch_taskbar_view('feed', 'story');
            }
        } else {
            NEWSBLUR.reader.switch_taskbar_view('story', is_temporary ? 'story' : false);
            this.load_story_iframe(story);
        }
    }
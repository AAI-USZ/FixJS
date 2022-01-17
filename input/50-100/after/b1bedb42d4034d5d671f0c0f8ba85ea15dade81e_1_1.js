function(models) {
        if (!models || !models.length) {
            models = NEWSBLUR.assets.stories;
        }
        if (!models.length) return;
        if (NEWSBLUR.reader.story_view != 'page') return;
        
        this.flags['iframe_fetching_story_locations'] = false;
        this.flags['iframe_story_locations_fetched'] = false;
        
        if (NEWSBLUR.reader.flags['story_titles_loaded']) {
            this.fetch_story_locations_in_story_frame({reset_timer: true});
        } else {
            this.prefetch_story_locations_in_story_frame();
        }
    }
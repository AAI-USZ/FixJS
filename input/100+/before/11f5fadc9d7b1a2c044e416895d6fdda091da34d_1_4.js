function(model, selected, options) {
        this.$el.toggleClass('NB-selected', !!this.model.get('selected'));
        
        if (selected && options.scroll_to_comments) {
            NEWSBLUR.app.story_list.scroll_to_selected_story(model, {
                scroll_offset: -50,
                scroll_to_comments: true
            });
        } else if (selected && 
            !options.selected_by_scrolling &&
            (NEWSBLUR.reader.story_view == 'feed' ||
             (NEWSBLUR.reader.story_view == 'page' &&
              NEWSBLUR.reader.flags['page_view_showing_feed_view']))) {
            NEWSBLUR.app.story_list.show_stories_preference_in_feed_view();
            NEWSBLUR.app.story_list.scroll_to_selected_story(model, options);
        }
    }
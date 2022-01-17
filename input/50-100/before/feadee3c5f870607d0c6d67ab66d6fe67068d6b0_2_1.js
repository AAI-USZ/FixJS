function(data) {
            this.model.set(data.comment);
            this.render();
            NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
        }
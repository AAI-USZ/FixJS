function(data) {
            if (this.options.on_social_page) {
                this.options.story_comments_view.replace_comment(this.model.get('user_id'), data);
            } else {
                this.model.set(data.comment);
                this.render();
                NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
            }
        }
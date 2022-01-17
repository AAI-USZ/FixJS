function(options) {
        this.story = options.story;
        if (!this.options.on_social_page) {
            this.user = NEWSBLUR.assets.user_profiles.find(this.model.get('user_id'));
        }
    }
function(options) {
        this.story = options.story;
        this.user = NEWSBLUR.assets.user_profiles.find(this.model.get('user_id'));
    }
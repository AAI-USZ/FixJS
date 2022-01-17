function() {
        var story = this.model;
        
        this.$el.removeClass('NB-story-negative NB-story-neutral NB-story-postiive')
                .addClass('NB-story-'+story.score_name(story.score()));
    }
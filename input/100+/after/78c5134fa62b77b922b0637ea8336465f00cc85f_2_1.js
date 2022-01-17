function() {
        $.get('/social/public_comments', {
            story_id: this.model.id,
            feed_id: this.model.get('story_feed_id'),
            user_id: NEWSBLUR.Globals.blurblog_user_id,
            format: "html"
        }, _.bind(function(template) {
            var $template = $($.trim(template));
            var $header = this.make('div', { 
                "class": 'NB-story-comments-public-header-wrapper' 
            }, this.make('div', { 
                "class": 'NB-story-comments-public-header' 
            }, Inflector.pluralize(' public comment', $('.NB-story-comment', $template).length, true)));

            this.$(".NB-story-comments-public-teaser-wrapper").replaceWith($template);
            $template.before($header);
        }, this));
    }
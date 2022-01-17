function() {
        var changes = this.model.changedAttributes();
        var onlySelected = changes && _.all(_.keys(changes), function(change) {
            return _.contains(['selected', 'read', 'intelligence'], change);
        });
        
        if (onlySelected) return;
        
        // if (this.model.changedAttributes()) {
        //     console.log(["Story changed", this.model.changedAttributes(), this.model.previousAttributes()]);
        // }
        
        var story = this.model;
        var unread_view = NEWSBLUR.assets.preference('unread_view');
        var score = story.score();
        
        if (this.feed) {
            this.$el.toggleClass('NB-inverse', this.feed.is_light());
        }
        this.$el.toggleClass('NB-river-story', NEWSBLUR.reader.flags.river_view);
        this.$el.toggleClass('NB-story-starred', !!story.get('starred'));
        this.$el.toggleClass('NB-story-shared', !!story.get('shared'));
        this.$el.removeClass('NB-story-negative NB-story-neutral NB-story-postiive')
                .addClass('NB-story-'+story.score_name(score));
                
        if (unread_view > score) {
            this.$el.css('display', 'none');
        }

        if (NEWSBLUR.assets.preference('show_tooltips')) {
            this.$('.NB-story-sentiment').tipsy({
                delayIn: 375,
                gravity: 's'
            });
            this.$('.NB-feed-story-hide-changes').tipsy({
                delayIn: 375
            });
        }
    }
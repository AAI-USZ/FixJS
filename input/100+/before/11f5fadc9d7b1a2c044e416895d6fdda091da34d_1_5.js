function(e) {
        var $tag = $(e.currentTarget);
        var classifier_type = $tag.hasClass('NB-feed-story-author') ? 'author' : 'tag';
        var value = _.string.trim($tag.text());
        var score = $tag.hasClass('NB-score-1') ? -1 : $tag.hasClass('NB-score--1') ? 0 : 1;
        var feed_id = this.model.get('story_feed_id');
        var data = {
            'feed_id': feed_id
        };
        
        if (score == 0) {
            data['remove_like_'+classifier_type] = value;
        } else if (score == 1) {
            data['like_'+classifier_type] = value;
        } else if (score == -1) {
            data['dislike_'+classifier_type] = value;
        }

        NEWSBLUR.assets.classifiers[feed_id][classifier_type+'s'][value] = score;
        NEWSBLUR.assets.recalculate_story_scores(feed_id, {story_view: this});
        NEWSBLUR.assets.save_classifier(data, function(resp) {
            NEWSBLUR.reader.force_feeds_refresh(null, true, feed_id);
        });
        
        this.preserve_classifier_color(classifier_type, value, score);
    }
function(options) {
        options = options || {};
        var $unshare_button = this.$('.NB-sideoption-share-unshare');
        var $unshare_button_menu = $('.NB-menu-manage-story-share-unshare');
        var $share_menu = $unshare_button_menu.closest('.NB-sideoption-share');
        
        $unshare_button.addClass('NB-saving').addClass('NB-disabled').text('Deleting...');
        NEWSBLUR.assets.mark_story_as_unshared(this.model.id, this.model.get('story_feed_id'), _.bind(this.post_share_story, this, false), _.bind(function(data) {
            this.post_share_error(data, false);
        }, this));
        
        if (NEWSBLUR.reader) {
            NEWSBLUR.reader.blur_to_page();
        }
    }
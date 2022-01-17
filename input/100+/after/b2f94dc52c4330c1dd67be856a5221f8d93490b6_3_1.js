function(options) {
        options = options || {};
        var $share_button = this.$('.NB-sideoption-share-save');
        var $share_button_menu = $('.NB-menu-manage-story-share-save');
        var $share_menu = $share_button_menu.closest('.NB-sideoption-share');
        var $comments_sideoptions = this.$('.NB-sideoption-share-comments');
        var $comments_menu = $('.NB-sideoption-share-comments', $share_menu);
        var comments = _.string.trim((options.source == 'menu' ? $comments_menu : $comments_sideoptions).val());
        if (this.options.on_social_page) {
            var source_user_id = NEWSBLUR.Globals.blurblog_user_id;
        } else {
            var feed = NEWSBLUR.assets.get_feed(NEWSBLUR.reader.active_feed);
            var source_user_id = feed && feed.get('user_id');
        }
        var post_to_services = _.compact([
            NEWSBLUR.assets.preference('post_to_twitter') && 'twitter',
            NEWSBLUR.assets.preference('post_to_facebook') && 'facebook'
        ]);
        
        $share_button.addClass('NB-saving').addClass('NB-disabled').text('Sharing...');
        $share_button_menu.addClass('NB-saving').addClass('NB-disabled').text('Sharing...');
        NEWSBLUR.assets.mark_story_as_shared(this.model.id, this.model.get('story_feed_id'), comments, source_user_id, post_to_services, _.bind(this.post_share_story, this, true), _.bind(function(data) {
            this.post_share_error(data, true);
        }, this));
        
        if (NEWSBLUR.reader) {
            NEWSBLUR.reader.blur_to_page();
        }
    }
function(shared, data) {
        this.model.set("shared", shared);
        
        var $share_star = this.model.story_title_view && this.model.story_title_view.$('.NB-storytitles-share');
        var $share_button = this.$('.NB-sideoption-share-save');
        var $unshare_button = this.$('.NB-sideoption-share-unshare');
        var $share_sideoption = this.$('.NB-feed-story-share .NB-sideoption-title');
        var $comments_sideoptions = this.$('.NB-sideoption-share-comments');
        var shared_text = this.model.get('shared') ? 'Shared' : 'Unshared';
        
        this.toggle_feed_story_share_dialog({'close': true});
        $share_button.removeClass('NB-saving').removeClass('NB-disabled').text('Share');
        $unshare_button.removeClass('NB-saving').removeClass('NB-disabled').text('Delete Share');
        $share_sideoption.text(shared_text).closest('.NB-sideoption');
        
        if (this.options.on_social_page) {
            this.model.social_page_comments.replace_comments(data);
        } else {
            this.model.story_view.$el.toggleClass('NB-story-shared', this.model.get('shared'));
            this.model.story_view.render_comments();
            NEWSBLUR.reader.hide_confirm_story_share_menu_item(true);
        }
        
        if (this.model.get('shared') && $share_star) {
            $share_star.attr({'title': shared_text + '!'});
            $share_star.tipsy({
                gravity: 'sw',
                fade: true,
                trigger: 'manual',
                offsetOpposite: -1
            });
            var tipsy = $share_star.data('tipsy');
            tipsy.enable();
            tipsy.show();

            _.delay(function() {
                if (tipsy.enabled) {
                    tipsy.hide();
                    tipsy.disable();
                }
            }, 850);
        }
        
        if (NEWSBLUR.app.story_list) {
            NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
        }
    }
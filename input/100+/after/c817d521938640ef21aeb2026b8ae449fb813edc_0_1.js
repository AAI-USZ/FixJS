function(options) {
        options = options || {};
        var feed_id = this.model.get('story_feed_id');
        var $sideoption = this.$('.NB-sideoption.NB-feed-story-share');
        var $share = this.$('.NB-sideoption-share-wrapper');
        var $story_content = this.$('.NB-feed-story-content');
        var $comment_input = this.$('.NB-sideoption-share-comments');
        var $story_comments = this.$('.NB-feed-story-comments');
        var $unshare_button = this.$('.NB-sideoption-share-unshare');
        var $twitter_button = this.$('.NB-sideoption-share-crosspost-twitter');
        var $facebook_button = this.$('.NB-sideoption-share-crosspost-facebook');
        
        if (options.close ||
            ($sideoption.hasClass('NB-active') && !options.resize_open)) {
            // Close
            $share.animate({
                'height': 0
            }, {
                'duration': 300,
                'easing': 'easeInOutQuint',
                'queue': false,
                'complete': _.bind(function() {
                    this.$('.NB-error').remove();
                }, this)
            });
            $sideoption.removeClass('NB-active');
            if ($story_content.data('original_height')) {
                $story_content.animate({
                    'height': $story_content.data('original_height')
                }, {
                    'duration': 300,
                    'easing': 'easeInOutQuint',
                    'queue': false,
                    'complete': function() {
                        NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
                    }
                });
                $story_content.removeData('original_height');
            }
        } else {
            // Open/resize
            if (!options.resize_open) {
                this.$('.NB-error').remove();
            }
            $sideoption.addClass('NB-active');
            $unshare_button.toggleClass('NB-hidden', !this.model.get("shared"));
            $twitter_button.toggleClass('NB-active', !!NEWSBLUR.assets.preference('post_to_twitter'));
            $facebook_button.toggleClass('NB-active', !!NEWSBLUR.assets.preference('post_to_facebook'));
            var $share_clone = $share.clone();
            var full_height = $share_clone.css({
                'height': 'auto',
                'position': 'absolute',
                'visibility': 'hidden'
            }).appendTo($share.parent()).height();
            $share_clone.remove();
            $share.animate({
                'height': full_height
            }, {
                'duration': options.immediate ? 0 : 350,
                'easing': 'easeInOutQuint',
                'queue': false,
                'complete': function() {
                    $comment_input.focus();
                }
            });
        
            var sideoptions_height = this.$('.NB-feed-story-sideoptions-container').innerHeight() + 12;
            var content_height = $story_content.innerHeight() + $story_comments.innerHeight();

            if (sideoptions_height + full_height > content_height) {
                // this.$s.$feed_stories.scrollTo(this.$s.$feed_stories.scrollTop() + sideoptions_height, {
                //     'duration': 350,
                //     'queue': false,
                //     'easing': 'easeInOutQuint'
                // });
                var original_height = $story_content.height();
                $story_content.animate({
                    'height': original_height + ((full_height + sideoptions_height) - content_height)
                }, {
                    'duration': 350,
                    'easing': 'easeInOutQuint',
                    'queue': false,
                    'complete': function() {
                        NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
                    }
                }).data('original_height', original_height);
            }
            this.update_share_button_label();
            var share = _.bind(function(e) {
                e.preventDefault();
                this.mark_story_as_shared({'source': 'sideoption'});
            }, this);
            var $comments = $('.NB-sideoption-share-comments', $share);
            $comments.unbind('keydown.story_share')
                     .bind('keydown.story_share', 'ctrl+return', share)
                     .bind('keydown.story_share', 'meta+return', share);

        }
    }
function() {
        var $form = this.$('.NB-story-comment-reply-form');
        var $submit = $(".NB-modal-submit-button", $form);
        var comment_user_id = this.model.get('user_id');
        var comment_reply = $('.NB-story-comment-reply-comments', $form).val();
        var original_message = $form.data('original_message');
        
        if (!comment_reply || comment_reply.length <= 1) {
            this.remove_social_comment_reply_form();
            NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
            return;
        }
        
        if ($submit.hasClass('NB-disabled')) {
            return;
        }
        
        $submit.addClass('NB-disabled').text('Posting...');
        NEWSBLUR.assets.save_comment_reply(this.options.story.id, this.options.story.get('story_feed_id'), 
                                      comment_user_id, comment_reply, 
                                      original_message,
                                      _.bind(function(data) {
            this.model.set(data.comment);
            this.render();
            NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
        }, this), _.bind(function(data) {
            var message = data && data.message || "Sorry, this reply could not be posted. Probably a bug.";
            if (!NEWSBLUR.Globals.is_authenticated) {
                message = "You need to be logged in to reply to a comment.";
            }
            var $error = $.make('div', { className: 'NB-error' }, message);
            $submit.removeClass('NB-disabled').text('Post');
            $form.find('.NB-error').remove();
            $form.append($error);
            NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
        }, this));
    }
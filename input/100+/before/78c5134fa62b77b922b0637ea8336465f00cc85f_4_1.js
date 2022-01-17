function(options) {
        options = options || {};
        var current_user = NEWSBLUR.assets.user_profile;
        
        var $form = $.make('div', { className: 'NB-story-comment-reply NB-story-comment-reply-form' }, [
            $.make('img', { className: 'NB-story-comment-reply-photo', src: current_user.get('photo_url') }),
            $.make('div', { className: 'NB-story-comment-username NB-story-comment-reply-username' }, current_user.get('username')),
            $.make('input', { type: 'text', className: 'NB-input NB-story-comment-reply-comments' }),
            $.make('div', { className: 'NB-modal-submit-button NB-modal-submit-green' }, options.is_editing ? 'Save' : 'Post')
        ]);
        this.remove_social_comment_reply_form();
        
        if (options.is_editing && options.$reply) {
            var original_message = $('.NB-story-comment-reply-content', options.$reply).text();
            $('input', $form).val(original_message);
            $form.data('original_message', original_message);
            options.$reply.hide().addClass('NB-story-comment-reply-hidden');
            options.$reply.after($form);
        } else {
            this.$el.append($form);
        }
        
        $('.NB-story-comment-reply-comments', $form).bind('keydown', 'enter', 
            _.bind(this.save_social_comment_reply, this));
        $('.NB-story-comment-reply-comments', $form).bind('keydown', 'return', 
            _.bind(this.save_social_comment_reply, this));
        $('.NB-story-comment-reply-comments', $form).bind('keydown', 'esc', _.bind(function(e) {
            e.preventDefault();
            this.remove_social_comment_reply_form();
        }, this));
        $('input', $form).focus();
        
        NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
    }
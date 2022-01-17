function(data, follow_user) {
            this.$('.NB-loading').removeClass('NB-active');
            this.model.set(follow_user);
            
            var $button = this.$('.NB-profile-badge-action-follow');
            $button.text('Following');
            $button.removeClass('NB-modal-submit-green')
                .removeClass('NB-modal-submit-red')
                .addClass('NB-modal-submit-grey');
            $button.removeClass('NB-profile-badge-action-follow')
                .addClass('NB-profile-badge-action-unfollow');
                
            NEWSBLUR.app.feed_list.make_social_feeds();
        }
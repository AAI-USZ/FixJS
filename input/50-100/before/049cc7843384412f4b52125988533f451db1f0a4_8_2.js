function(data, unfollow_user) {
            this.$('.NB-loading').removeClass('NB-active');
            this.model.set(unfollow_user);
            
            var $button = this.$('.NB-profile-badge-action-follow');
            $button.text('Unfollowed');
            $button.removeClass('NB-modal-submit-close')
                .addClass('NB-modal-submit-red');
            $button.removeClass('NB-profile-badge-action-unfollow')
                .addClass('NB-profile-badge-action-follow');
                
            NEWSBLUR.app.feed_list.make_social_feeds();
        }
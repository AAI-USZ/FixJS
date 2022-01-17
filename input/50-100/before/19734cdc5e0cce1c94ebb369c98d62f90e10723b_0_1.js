function() {
        var $badge = $('.NB-friends-findfriends-profile', this.$modal).empty();
        var $profile_badge;
        var profile = this.profile;
        
        $profile_badge = new NEWSBLUR.Views.SocialProfileBadge({model: profile});
        $badge.append($profile_badge);
    }
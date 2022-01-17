function() {
        var $badge = $('.NB-friends-findfriends-profile', this.$modal).empty();
        var $profile_badge;
        var profile = this.profile;
        
        if (!profile.get('location') && !profile.get('bio') && !profile.get('website')) {
            $profile_badge = $.make('a', { 
                className: 'NB-friends-profile-link NB-modal-submit-button NB-modal-submit-green', 
                href: '#'
            }, [
                'Fill out your profile ',
                $.make('img', { src: NEWSBLUR.Globals['MEDIA_URL']+'img/icons/silk/eye.png', style: 'padding-left: 10px' }),
                $.make('img', { src: NEWSBLUR.Globals['MEDIA_URL']+'img/icons/silk/eye.png' })
            ]);
        } else {
            $profile_badge = new NEWSBLUR.Views.SocialProfileBadge({
                model: profile,
                show_edit_button: true
            });
        }
        
        $badge.append($profile_badge);
    }
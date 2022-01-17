function() {
        var self = this;
        
        this.$modal = $.make('div', { className: 'NB-modal NB-modal-friends' }, [
            $.make('div', { className: 'NB-modal-tabs' }, [
                $.make('div', { className: 'NB-modal-loading' }),
                $.make('div', { className: 'NB-modal-tab NB-active NB-modal-tab-findfriends' }, 'Find Friends'),
                $.make('div', { className: 'NB-modal-tab NB-modal-tab-following' }, 'I\'m Following'),
                $.make('div', { className: 'NB-modal-tab NB-modal-tab-followers' }, 'Following Me')
            ]),
            $.make('h2', { className: 'NB-modal-title' }, 'Friends and Followers'),
            $.make('div', { className: 'NB-tab NB-tab-findfriends NB-active' }, [
                $.make('fieldset', [
                    $.make('legend', 'Your profile'),
                    $.make('div', { className: 'NB-modal-section NB-friends-findfriends-profile' })
                ]),
                $.make('fieldset', [
                    $.make('legend', 'Social Connections'),
                    $.make('div', { className: 'NB-modal-section NB-friends-services' })
                ]),
                $.make('fieldset', [
                    $.make('legend', 'People to follow'),
                    $.make('div', { className: 'NB-modal-section NB-friends-findlist' })
                ]),
                $.make('fieldset', [
                    $.make('legend', 'Search for friends'),
                    $.make('div', { className: 'NB-modal-section NB-friends-search' })
                ])
            ]),
            $.make('div', { className: 'NB-tab NB-tab-profile' }, [
                $.make('fieldset', [
                    $.make('legend', 'Profile picture'),
                    $.make('div', { className: 'NB-modal-section NB-friends-profilephoto'})
                ]),
                $.make('fieldset', [
                    $.make('legend', 'Profile'),
                    $.make('div', { className: 'NB-modal-section NB-friends-profile'})
                ]),
                $.make('div', { className: 'NB-modal-submit-grey NB-profile-save-button NB-modal-submit-button' }, 'Save my profile')
            ]),
            $.make('div', { className: 'NB-tab NB-tab-following' }),
            $.make('div', { className: 'NB-tab NB-tab-followers' })
        ]);
    }
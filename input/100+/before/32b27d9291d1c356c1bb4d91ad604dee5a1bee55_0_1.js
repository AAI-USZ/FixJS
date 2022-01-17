function() {
        var self = this;
        
        this.$modal = $.make('div', { className: 'NB-modal NB-modal-profile-editor' }, [
            $.make('div', { className: 'NB-modal-tabs' }, [
                $.make('div', { className: 'NB-modal-loading' }),
                $.make('div', { className: 'NB-modal-tab NB-active NB-modal-tab-profile' }, 'Profile'),
                $.make('div', { className: 'NB-modal-tab NB-modal-tab-blurblog' }, 'Blurblog')
            ]),
            $.make('h2', { className: 'NB-modal-title' }, 'Your Profile'),
            $.make('div', { className: 'NB-tab NB-tab-profile NB-active' }, [
                $.make('fieldset', [
                    $.make('legend', 'Preview'),
                    $.make('div', { className: 'NB-modal-section NB-friends-findfriends-profile' })
                ]),
                $.make('fieldset', [
                    $.make('legend', 'Profile picture'),
                    $.make('div', { className: 'NB-modal-section NB-friends-profilephoto'})
                ]),
                $.make('fieldset', [
                    $.make('legend', 'Profile Details'),
                    $.make('div', { className: 'NB-modal-section NB-friends-profile'}, [
                        $.make('form', [
                            $.make('label', 'Username'),
                            $.make('div', { className: 'NB-profile-username' }, [
                                NEWSBLUR.Globals.username,
                                $.make('a', { className: 'NB-splash-link NB-account-link', href: '#' }, 'Change')
                            ]),
                            $.make('label', { 'for': 'NB-profile-location' }, 'Location'),
                            $.make('input', { id: 'NB-profile-location', name: 'location', type: 'text', className: 'NB-input', style: 'width: 300px', value: this.profile.get('location'), "data-max": 40 }),
                            $.make('span', { className: 'NB-count NB-count-location' }),
                            $.make('label', { 'for': 'NB-profile-website' }, 'Website'),
                            $.make('input', { id: 'NB-profile-website', name: 'website', type: 'text', className: 'NB-input', style: 'width: 440px', value: this.profile.get('website'), "data-max": 200 }),
                            $.make('span', { className: 'NB-count NB-count-website' }),
                            $.make('label', { 'for': 'NB-profile-bio' }, 'Bio'),
                            $.make('input', { id: 'NB-profile-bio', name: 'bio', type: 'text', className: 'NB-input', style: 'width: 580px', value: this.profile.get('bio'), "data-max": 160 }),
                            $.make('span', { className: 'NB-count NB-count-bio' })
                        ])
                    ])
                ]),
                $.make('div', { className: 'NB-modal-submit-grey NB-profile-save-button NB-modal-submit-button' }, 'Change your profile above')
            ]),
            $.make('div', { className: 'NB-tab NB-tab-blurblog' }, [
                $.make('fieldset', [
                    $.make('legend', 'Your Blurblog'),
                    $.make('div', { className: 'NB-modal-section NB-profile-editor-blurblog-preview' }, [
                        $.make('label', { 'for': 'NB-profile-blurblog-address' }, 'Blurblog address'),
                        $.make('a', { href: this.profile.get('feed_link'), target: '_blank', className: 'NB-profile-blurblog-address NB-splash-link' }, this.profile.get('feed_link')),
                        $.make('label', { 'for': 'NB-profile-blurblog-title' }, 'Blurblog title'),
                        $.make('input', { type: 'text', id: 'NB-profile-blurblog-title', name: 'blurblog_title', value: this.profile.get('feed_title'), className: 'NB-input' }),
                        $.make('label', 'Background color'),
                        this.make_color_palette()
                    ])
                ]),
                $.make('fieldset', [
                    $.make('legend', 'Custom CSS for your Blurblog'),
                    $.make('div', { className: 'NB-modal-section NB-profile-editor-blurblog-custom-css'}, [
                        $.make('textarea', { 'className': 'NB-profile-blurblog-css', name: 'css' })
                    ])
                ]),
                $.make('div', { className: 'NB-modal-submit-grey NB-blurblog-save-button NB-modal-submit-button' }, 'Change your blurblog settings above')
            ]),
            $.make('div', { className: 'NB-tab NB-tab-following' }),
            $.make('div', { className: 'NB-tab NB-tab-followers' })
        ]);
    }
function() {
        var profile = this.model;
        this.$el.html($.make('table', {}, [
            $.make('tr', [
                $.make('td', { className: 'NB-profile-badge-photo-wrapper' }, [
                    $.make('div', { className: 'NB-profile-badge-photo' }, [
                        $.make('img', { src: profile.photo_url({'size': this.options.photo_size}) })
                    ])
                ]),
                $.make('td', { className: 'NB-profile-badge-info' }, [
                    $.make('div', { className: 'NB-profile-badge-actions' }, [
                        $.make('div', { className: 'NB-loading' })
                    ]),
                    $.make('div', { className: 'NB-profile-badge-username NB-splash-link' }, profile.get('username')),
                    $.make('div', { className: 'NB-profile-badge-location' }, profile.get('location')),
                    (profile.get('website') && $.make('a', { 
                        href: profile.get('website'), 
                        target: '_blank',
                        rel: 'nofollow',
                        className: 'NB-profile-badge-website NB-splash-link'
                    }, profile.get('website').replace('http://', ''))),
                    $.make('div', { className: 'NB-profile-badge-bio' }, profile.get('bio')),
                    (_.isNumber(profile.get('shared_stories_count')) && 
                     $.make('div', { className: 'NB-profile-badge-stats' }, [
                        $.make('span', { className: 'NB-count' }, profile.get('shared_stories_count')),
                        'shared ',
                        Inflector.pluralize('story', profile.get('shared_stories_count')),
                        ' &middot; ',
                        $.make('span', { className: 'NB-count' }, profile.get('follower_count')),
                        Inflector.pluralize('follower', profile.get('follower_count'))
                    ]))
                ])
            ])
        ]));
        
        var $actions;
        if (NEWSBLUR.reader.model.user_profile.get('user_id') == profile.get('user_id')) {
            $actions = $.make('div', { className: 'NB-profile-badge-action-buttons' }, [
                $.make('div', { 
                    className: 'NB-profile-badge-action-self NB-modal-submit-button' 
                }, 'You'),
                (this.options.show_edit_button && $.make('div', { 
                    className: 'NB-profile-badge-action-edit NB-modal-submit-button NB-modal-submit-grey ' +
                               (!profile.get('shared_stories_count') ? 'NB-disabled' : '')
                }, 'Edit Profile'))
            ]);
        } else if (_.contains(NEWSBLUR.reader.model.user_profile.get('following_user_ids'), profile.get('user_id'))) {
            $actions = $.make('div', { 
                className: 'NB-profile-badge-action-unfollow NB-profile-badge-action-buttons NB-modal-submit-button NB-modal-submit-close' 
            }, 'Following');
        } else {
            $actions = $.make('div', { className: 'NB-profile-badge-action-buttons' }, [
                $.make('div', { 
                    className: 'NB-profile-badge-action-follow NB-modal-submit-button NB-modal-submit-green' 
                }, 'Follow'),
                $.make('div', { 
                    className: 'NB-profile-badge-action-preview NB-modal-submit-button NB-modal-submit-grey ' +
                               (!profile.get('shared_stories_count') ? 'NB-disabled' : '')
                }, 'Preview')
            ]);
        }
        this.$('.NB-profile-badge-actions').append($actions);
        
        if (this.options.embiggen) {
            this.$el.addClass("NB-profile-badge-embiggen");
        }
        
        return this;
    }
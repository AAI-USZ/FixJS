function() {
        $('.NB-modal-loading', this.$modal).removeClass('NB-active');
        var $services = $('.NB-friends-services', this.$modal).empty();
        var service_syncing = false;
        
        _.each(['twitter', 'facebook'], _.bind(function(service) {
            var $service;
            
            if (this.services && this.services[service][service+'_uid']) {
                var syncing = this.services[service].syncing;
                if (syncing) service_syncing = true;
                $service = $.make('div', { className: 'NB-friends-service NB-connected NB-friends-service-'+service + (this.services[service].syncing ? ' NB-friends-service-syncing' : '') }, [
                    $.make('div', { className: 'NB-friends-service-title' }, _.string.capitalize(service)),
                    $.make('div', { className: 'NB-friends-service-connect NB-modal-submit-button NB-modal-submit-grey' }, syncing ? 'Fetching...' : 'Disconnect')
                ]);
            } else {
                $service = $.make('div', { className: 'NB-friends-service NB-friends-service-'+service }, [
                    $.make('div', { className: 'NB-friends-service-title' }, _.string.capitalize(service)),
                    $.make('div', { className: 'NB-friends-service-connect NB-modal-submit-button NB-modal-submit-green' }, [
                        $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/' + service + '_icon.png' }),
                        'Find ' + _.string.capitalize(service) + ' Friends'
                    ])
                ]);
            }
            $services.append($service);
        }, this));
       
        $autofollow = $.make('div', { className: 'NB-friends-service NB-friends-autofollow'}, [
            $.make('input', { type: 'checkbox', className: 'NB-friends-autofollow-checkbox', id: 'NB-friends-autofollow-checkbox', checked: this.autofollow ? 'checked' : null }),
            $.make('label', { className: 'NB-friends-autofollow-label', 'for': 'NB-friends-autofollow-checkbox' }, [
                'Auto-follow',
                $.make('br'),
                'my friends'
            ])
        ]);
        $services.prepend($autofollow);
        
        $('.NB-friends-search').html($.make('div', [
            $.make('label', { 'for': 'NB-friends-search-input' }, 'Username or email:'),
            $.make('input', { type: 'text', className: 'NB-input', id: 'NB-friends-search-input' }),
            $.make('div', { className: 'NB-loading NB-friends-search-loading' }),
            $.make('div', { className: 'NB-friends-search-badges' })
        ]));
        
        var $findlist = $('.NB-friends-findlist', this.$modal).empty();
        if (this.recommended_users.length) {
            _.each(this.recommended_users, function(profile) {
                var profile_model = new NEWSBLUR.Models.User(profile);
                $profile_badge = new NEWSBLUR.Views.SocialProfileBadge({
                    model: profile_model
                });
                $findlist.append($profile_badge);
            });
        } else {
            var $ghost = $.make('div', { className: 'NB-ghost' }, 'Nobody left to recommend. Good job!');
            $findlist.append($ghost);
        }
        
        if (service_syncing) {
            _.delay(_.bind(this.check_services_sync_status, this), 3000);
        }
    }
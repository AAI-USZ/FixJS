function() {
        $('.NB-modal-loading', this.$modal).removeClass('NB-active');
        var $services = $('.NB-intro-services', this.$modal).empty();
        var service_syncing = false;
        
        _.each(['twitter', 'facebook'], _.bind(function(service) {
            var $service;
            if (this.services && this.services[service][service+'_uid'] && !this.services[service].syncing) {
                $service = $.make('div', { className: 'NB-friends-service NB-connected NB-friends-service-'+service }, [
                    $.make('div', { className: 'NB-friends-service-title' }, _.string.capitalize(service)),
                    $.make('div', { className: 'NB-friends-service-connected' }, [
                        $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/' + service + '_icon.png' }),
                        'Connected'
                    ])
                ]);
                
            } else {
                var syncing = this.services && this.services[service] && this.services[service].syncing;
                if (syncing) service_syncing = true;
                
                $service = $.make('div', { className: 'NB-friends-service NB-friends-service-'+service + (syncing ? ' NB-friends-service-syncing' : '') }, [
                    $.make('div', { className: 'NB-friends-service-title' }, _.string.capitalize(service)),
                    $.make('div', { className: 'NB-friends-service-connect NB-modal-submit-button ' + (syncing ? 'NB-modal-submit-grey' : 'NB-modal-submit-green') }, [
                        $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/' + service + '_icon.png' }),
                        (syncing ? 'Fetching...' : 'Find ' + _.string.capitalize(service) + ' Friends')
                    ])
                ]);
            }
            $services.append($service);
        }, this));
       
        var $autofollow = $.make('div', { className: 'NB-friends-autofollow'}, [
            $.make('input', { type: 'checkbox', className: 'NB-friends-autofollow-checkbox', id: 'NB-friends-autofollow-checkbox', checked: this.autofollow ? 'checked' : null }),
            $.make('label', { className: 'NB-friends-autofollow-label', 'for': 'NB-friends-autofollow-checkbox' }, 'and auto-follow them')
        ]);
        $services.prepend($autofollow);
        
        if (!this.services.twitter.twitter_uid || !this.services.facebook.facebook_uid) {
             var $note = $.make('div', { className: 'NB-note'}, [
                'Feel comfortable connecting to these services.',
                $.make('br'),
                'Nothing happens without your permission.'
            ]);
            $services.append($note);
        }
        if (this.services.twitter.twitter_uid || this.services.facebook.facebook_uid) {
            var $stats = $.make('div', { className: 'NB-services-stats' });
            _.each(['following', 'follower'], _.bind(function(follow) {
                var $stat = $.make('div', { className: 'NB-intro-services-stats-count' }, [
                    $.make('div', { className: 'NB-intro-services-stats-count-number' }, this.profile.get(follow+'_count')),
                    $.make('div', { className: 'NB-intro-services-stats-count-description' }, Inflector.pluralize(follow, this.profile.get(follow+'_count')))
                ]);
                $stats.append($stat);
            }, this));
            $services.append($stats);
            $('.NB-tutorial-next-page-text', this.$modal).text('Next step ');
        }

        if (service_syncing) {
            _.delay(_.bind(this.fetch_friends, this), 3000);
        }
    }
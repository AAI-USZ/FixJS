function(service) {
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
                $service = $.make('div', { className: 'NB-friends-service NB-friends-service-'+service + (syncing ? ' NB-friends-service-syncing' : '') }, [
                    $.make('div', { className: 'NB-friends-service-title' }, _.string.capitalize(service)),
                    $.make('div', { className: 'NB-friends-service-connect NB-modal-submit-button ' + (syncing ? 'NB-modal-submit-grey' : 'NB-modal-submit-green') }, [
                        $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/' + service + '_icon.png' }),
                        (syncing ? 'Fetching...' : 'Find ' + _.string.capitalize(service) + ' Friends')
                    ])
                ]);
                if (syncing) {
                    _.delay(_.bind(this.fetch_friends, this), 3000);
                }
            }
            $services.append($service);
        }
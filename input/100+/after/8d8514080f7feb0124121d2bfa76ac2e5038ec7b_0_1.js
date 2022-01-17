function(service) {
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
        }
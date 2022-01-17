function(service) {
        var $service = $('.NB-friends-service-'+service, this.$modal);
        $('.NB-friends-service-connect', $service).text('Disconnecting...');
        _gaq.push(['_trackEvent', 'reader_intro', 'Disconnect from ' + this.service.name]);
        NEWSBLUR.assets.disconnect_social_service(service, _.bind(function(data) {
            this.services = data.services;
            this.make_find_friends_and_services();
            this.make_profile_section();
            this.make_profile_tab();
        }, this));
    }
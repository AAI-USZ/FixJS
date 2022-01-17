function(responses) {
            if (responses && responses.length > 0) {
                var html = responses[0].formatted_address;
                updateInfoWindow(html);
            } else {
                $(window).trigger('show.mapsnotification.sakai', {
                    subject: sakai.api.i18n.getValueForKey('NO_ADDRESS', 'googlemaps'),
                    body: sakai.api.i18n.getValueForKey('CANNOT_DETERMINE_ADDRESS_AT_THIS_LOCATION', 'googlemaps')
                });
            }
        }
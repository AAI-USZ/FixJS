function(results, status){
            if (status == google.maps.GeocoderStatus.OK) {
                var position = results[0].geometry.location;
                map.setCenter(position);
                marker.setMap(map);
                marker.setPosition(position);
                var html = results[0].formatted_address;
                updateInfoWindow(html);
            } else {
                sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('NO_ADDRESS', 'googlemaps'), 
                                                 sakai.api.i18n.getValueForKey('CANNOT_DETERMINE_ADDRESS_AT_THIS_LOCATION', 'googlemaps'));
            }
        }
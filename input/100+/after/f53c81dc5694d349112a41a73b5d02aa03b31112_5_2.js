function (marker, gicon, gshadow) {
            var that = this;
            $geocoder.geocode({'address': marker.address}, function (results, status) {
                if (status === $googlemaps.GeocoderStatus.OK) {
                    $markersToLoad -= 1;
                    if (that.data('gmap').opts.log) {console.log("Geocode was successful with point: ", results[0].geometry.location); }
                    methods._processMarker.apply(that, [marker, gicon, gshadow, results[0].geometry.location]);
                } else {
                    if(status === $googlemaps.GeocoderStatus.OVER_QUERY_LIMIT) {
                        if ((!that.data('gmap').opts.noAlerts) && (overQueryLimit === 0)) {alert('Error: too many geocoded addresses! Switching to 1 marker/s mode.'); }

                        overQueryLimit+=1000;
                        window.setTimeout(function() {
                            methods._geocodeMarker.apply(that, [marker, gicon, gshadow]);
                        }, overQueryLimit);
                    }
                    if (that.data('gmap').opts.log) {console.log("Geocode was not successful for the following reason: " + status); }
                }
            });
        }
function (results, status) {
                $markersToLoad -= 1;
                if (status === $googlemaps.GeocoderStatus.OK) {
                    if (that.data('gmap').opts.log) {console.log("Geocode was successful with point: ", results[0].geometry.location); }
                    methods.processMarker.apply(that, [marker, gicon, gshadow, results[0].geometry.location]);
                } else {
                    if (that.data('gmap').opts.log) {console.log("Geocode was not successful for the following reason: " + status); }
                }
            }
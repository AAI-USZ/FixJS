function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map2.setCenter(results[0].geometry.location);
                console.log(results);
                marker_you.setPosition(results[0].geometry.location);
                }
            }
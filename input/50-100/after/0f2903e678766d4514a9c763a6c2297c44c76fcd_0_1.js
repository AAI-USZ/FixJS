function (event) {
                marker.setPosition (event.latLng);
                $('#SiteLatDec').val(event.latLng.lat())
                $('#SiteLonDec').val(event.latLng.lng())
                gmap.panTo (marker.getPosition());
                console.log ("UDM",event);
            }
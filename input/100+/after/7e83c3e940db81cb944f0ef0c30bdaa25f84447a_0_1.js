function() {
			debug('dragend');
			newPoint = marker.getLatLng();
			set_user_location(newPoint);
                        marker_has_been_moved = true;

		        //If reverse geocoding is enabled, we use it
		        if (reverseGeocoding == true) {
			    $('#'+location_status_field_id).text('Se ha cambiado la ubicación');
			    // evitamos que el usuario
			    marker_has_been_moved = false;
			    $.getJSON('/exchanges/reverse_geocoding', {lat: newPoint.lat(), lng:newPoint.lng()}, function(result) {
				$('#ExchangeCountry').val(result.country);
				$('#ExchangeProvince').val(result.province);
				$('#ExchangeLocality').val(result.locality);

				// hasta que no obtenemos los datos de la geolocalización no dejamos al usuario continuar
				marker_has_been_moved = true;
			    });
			}
		}
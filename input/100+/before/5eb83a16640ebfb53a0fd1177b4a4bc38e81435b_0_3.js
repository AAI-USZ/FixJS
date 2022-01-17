function() {

		if ($(this).is(':hidden')) {
			$('div.observations > div.observations_list').show();
			$('#map_view_bttn').css('background-color', 'transparent');
			$('#map_results_list > div.observations_list').remove();
			updateGallery(undefined, undefined, 0);
			// alert(" hiding map view");
			
		} else {
			$('div.observations > div.observations_list').hide();
			$('div.observations > div.observations_list').html('');
			// alert("showing map view");
		}

		google.maps.event.trigger(big_map, 'resize');
		big_map.setCenter(nagpur_latlng);
	}
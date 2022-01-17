function initPosition(position) {
		elm.myPosition = {
			lat : position.coords.latitude,
			long : position.coords.longitude
		};

		/**
		 * Request to get users location if have coordinates - will store the data on session and in db
		 */
		jQuery.ajax({
			url: '/index/init-location/',
			data: jQuery.serializeJSON(elm.myPosition),
			dataType: 'json',
			success: function(response) {
				if (response.location) {
					window.location = response.location;
				}

				if (response.success) {
					console.log(response);
				} else {
					alert('error in request');
				}
			},
			error: function() {
				// @TODO create a simple error handler function to display global message
				//alert('error in request');
			}
		});
	}
function(results, status) {
			if (status == google.maps.GeocoderStatus.OK && results[0]) {
				// Update the order's address
				that.order.set({ address: results[0].formatted_address }, {silent: true});
				
				// Render the view
				that.render();

				// Render the map
				that.renderMap(position);
			}
		}
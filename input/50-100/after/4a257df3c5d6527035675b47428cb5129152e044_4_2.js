function(results, status) {
			if (status == google.maps.GeocoderStatus.OK && results[0]) {
				var address = results[0].formatted_address;

				// Perform a little formatting (replace commas with newlines)
				address = address.replace(/,/g, "\n");

				// Update the order's address
				that.order.set({ address: address }, {silent: true});
				
				// Render the view
				that.render();

				// Render the map
				that.renderMap(position);
			}
		}
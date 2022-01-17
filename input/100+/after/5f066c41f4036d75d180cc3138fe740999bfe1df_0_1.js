function(address){

		var me = this;



		if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {

			address.address = [ address.street, address.locality, address.region, address.country ].join(', ');

		}

		

		if (address.hasOwnProperty('lat') && address.hasOwnProperty('lon')) {

			var latlon = address.toProprietary(this.api);

			this.geocoders[this.api].getLocations(latlon, function(response) {

				me.geocode_callback(response);

			});

		} else {

			this.geocoders[this.api].getLocations(address.address, function(response) {

				me.geocode_callback(response);

			});

		}

	}
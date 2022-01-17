function(address){

		var me = this;

		

		if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {

			address.address = [ address.street, address.locality, address.region, address.country ].join(', ');

		}

		

		if (address.hasOwnProperty('lat') && address.hasOwnProperty('lon')) {

			var latlon = address.toProprietary(this.api);

			this.geocoders[this.api].geocode({'latLng': latlon }, function(results, status) {

				me.geocode_callback(results, status);

			});

		} else {

			this.geocoders[this.api].geocode({'address': address.address }, function(results, status) {

				me.geocode_callback(results, status);

			});

		}

	}
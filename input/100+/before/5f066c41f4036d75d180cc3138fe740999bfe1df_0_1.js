function(address){

		var me = this;



		if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {

			address.address = [ address.street, address.locality, address.region, address.country ].join(', ');

		}

		

		this.geocoders[this.api].getLocations(address.address, function(response) {

			me.geocode_callback(response);

		});

	}
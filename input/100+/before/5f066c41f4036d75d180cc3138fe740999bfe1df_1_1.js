function(address){

		var me = this;



		if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {

			address.address = [ address.street, address.locality, address.region, address.country ].join(', ');

		}

		

		this.geocoders[this.api].geocode({'address': address.address }, function(results, status) {

			me.geocode_callback(results, status);

		});

	}
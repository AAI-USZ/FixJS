function(house) {
		var indexes = this.findHouseOnSupplyTrack(house);

		if (indexes === -1) {
			throw 'House ' + house.name + ' is not on the supply track.';
		}

		return indexes[0];
	}
function(data) {

		// Updates the key for each area
		for(var index in data.agregation) {
			data.agregation[index].id = explore.areas[data.agregation[index].area];
		}

		// Gives the data objects to the layer
		explore.reportsAgregation = data.agregation;

		// No layer defined, loads the svg file
		if(explore.map === null) {

			explore.map = $K.map( explore.$exploreMap );
			explore.map.loadMap('/assets/data/douala-districts.svg', function() {
				
				explore.map.addLayer({
					id: 'douala-arrts',
					key: 'id'
				});

				explore.updateMap(explore.map);

			});

		// Layer exists, update the data
		} else {

			explore.updateMap(explore.map);			
		}
	}
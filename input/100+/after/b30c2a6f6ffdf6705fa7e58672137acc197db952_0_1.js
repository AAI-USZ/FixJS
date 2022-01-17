function(data) {

		var $map  = $("#explore-map"),
		mapWidth  = $map.innerWidth(),
		mapHeight = $map.innerHeight(),
		areas	  = {
			"/api/v1/areas/1/" : "Douala-I",
			"/api/v1/areas/2/" : "Douala-II",
			"/api/v1/areas/3/" : "Douala-III",
			"/api/v1/areas/4/" : "Douala-IV",
			"/api/v1/areas/5/" : "Douala-V"
		};

		// Updates the key for each area
		for(var index in data.objects) {
			data.objects[index].id = areas[data.objects[index].area];
		}

		// Gives the data objects to the layer
		explore.dep_data = data.objects;

		// No layer defined, loads the svg file
		if(explore.map === null) {

			explore.map = $K.map('#explore-map', mapWidth, mapHeight);
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
function(data) {
		// check to see if the tour has been updated
		var tour = tap.tours.get(data.id);
		if (tour && Date.parse(data.lastModified) <= Date.parse(tour.get('lastModified'))) return;

		// create new instance of StopCollection
		var stops = new TapAPI.collections.Stops(null, data.id);
		// create new instance of AssetCollection
		var assets = new TapAPI.collections.Assets(null, data.id);

		// remove existing models for this tour
		if (tap.tours.get(data.id)) {
			tap.tours.get(data.id).destroy();
			stops.fetch();
			stops.each(function(stop) {
				stop.destroy();
			});
			assets.fetch();
			assets.each(function(asset) {
				asset.destroy();
			});
		}

		tap.trigger('tap.init.create-tour', {id: data.id});

		// create new tour
		tap.tours.create({
			id: data.id,
			appResource: data.tourMetadata && data.tourMetadata.appResource ? objectToArray(data.tourMetadata.appResource) : undefined,
			//appResource: objectToArray(data.appResource),
			connection: objectToArray(data.connection),
			description: data.tourMetadata && data.tourMetadata.description ? objectToArray(data.tourMetadata.description) : undefined,
			lastModified: data.tourMetadata && data.tourMetadata.lastModified ? data.tourMetadata.lastModified : undefined,
			propertySet: data.tourMetadata && data.tourMetadata.propertySet ? objectToArray(data.tourMetadata.propertySet.property) : undefined,
			publishDate: data.tourMetadata && data.tourMetadata.publishDate ? objectToArray(data.tourMetadata.publishDate) : undefined,
			rootStopRef: data.tourMetadata && data.tourMetadata.rootStopRef ? data.tourMetadata.rootStopRef : undefined,
			title: data.tourMetadata && data.tourMetadata.title ? objectToArray(data.tourMetadata.title) : undefined
		});

		var i, j;
		// load tour models
		var numStops = data.stop.length;
		for (i = 0; i < numStops; i++) {
			var connections = [];
			if(!_.isUndefined(data.connection)) {
				for(j = 0; j < data.connection.length; j++) {
					if(data.connection[j].srcId == data.stop[i].id) {
						connections.push({priority: data.connection[j].priority, destId: data.connection[j].destId});
					}
				}
			}

			stops.create({
				id: data.stop[i].id,
				connection: connections,
				view: data.stop[i].view,
				description: objectToArray(data.stop[i].description),
				propertySet: data.stop[i].propertySet ? objectToArray(data.stop[i].propertySet.property) : undefined,
				assetRef: objectToArray(data.stop[i].assetRef),
				title: objectToArray(data.stop[i].title)
			});
		}

		// load asset models
		var numAssets = data.asset.length;
		for (i = 0; i < numAssets; i++) {
			// modifiy source propertySet child to match similar elements
			if(data.asset[i].source) {
				data.asset[i].source = objectToArray(data.asset[i].source);
				var numSources = data.asset[i].source.length;
				for (j = 0; j < numSources; j++) {
					if(data.asset[i].source[j].propertySet) {
						data.asset[i].source[j].propertySet = objectToArray(data.asset[i].source[j].propertySet.property);
					}
				}
			}
			if(data.asset[i].content) {
				data.asset[i].content = objectToArray(data.asset[i].content);
				var numContent = data.asset[i].content.length;
				for (j = 0; j < numContent; j++) {
					if(data.asset[i].content[j].propertySet) {
						data.asset[i].content[j].propertySet = objectToArray(data.asset[i].content[j].propertySet.property);
					}
				}
			}

			assets.create({
				assetRights: objectToArray(data.asset[i].assetRights),
				content: data.asset[i].content,
				id: data.asset[i].id,
				source: data.asset[i].source,
				propertySet: data.asset[i].propertySet ? objectToArray(data.asset[i].propertySet.property) : undefined
			});
		}
		// clear out the temporary models
		stops.reset();
		assets.reset();
	}
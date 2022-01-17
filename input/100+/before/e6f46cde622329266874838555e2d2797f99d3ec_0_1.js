function(layerType, options, save) {

		var protocolFormat = new OpenLayers.Format.GeoJSON();

		if (layerType == Ushahidi.KML) {
			protocolFormat = new OpenLayers.Format.KML({
				extractStyles: true,
				extractAttributes: true,
				maxDepth: 5
			});
		} else if (layerType == Ushahidi.DEFAULT) {
			this.deleteLayer("default");
			
			var markers = null;
			
			// Check for the style map
			if (options.styleMap) {

				// Create vector layer
				markers = new OpenLayers.Layer.Vector("default", {
					styleMap: styleMap
				});

				// Add features to the vector layer
				makers.addFeatures(new OpenLayers.Feature.Vector(this._olMap.getCenter()));

			} else {
				markers = new OpenLayers.Layer.Markers("default");
				markers.addMarker(new OpenLayers.Marker(this._olMap.getCenter()));
			}			

			// Add the layer to the map
			this._olMap.addLayer(markers);

			// Is map-click detection enabled?
			if (options.detectMapClicks == undefined || options.detectMapClicks) {
				var context = this;
				context._olMap.events.register("click", context._olMap, function(e){
					var point = context._olMap.getLonLatFromViewPortPx(e.xy);
					markers.clearMarkers();
					markers.addMarker(new OpenLayers.Marker(point));

					point.transform(Ushahidi.proj_900913, Ushahidi.proj_4326);
					
					var coords = {latitude: point.lat, longitude: point.lon};
					context.trigger("markerpositionchanged", coords);

					// Update the current map center
					var newCenter = new OpenLayers.LonLat(coords.longitude, coords.latitude);
					newCenter.transform(Ushahidi.proj_4326, Ushahidi.proj_900913);
					context._currentCenter = newCenter;
				});
			}

			this._isLoaded = 1;

			return this;
		}

		// No options defined - where layerType !== Ushahidi.DEFAULT
		if (options == undefined) {
			throw "Invalid layer options";
		}

		// Save the layer data in the internal registry
		if (save !== undefined && save) {
			this._registry.push({layerType: layerType, options: options});
		}

		// Transform feature geometry to Spherical Mercator
		preFeatureInsert = function(feature) {
			if (feature.geometry) {
				var point = new OpenLayers.Geometry.Point(feature.geometry.x, feature.geometry.y);
				OpenLayers.Projection.transform(point, Ushahidi.proj_4326, Ushahidi.proj_900913);
				feature.geometry.x = point.x;
				feature.geometry.y = point.y;
			}
		}

		// Layer names should be unique, therefore delete any
		// existing layer that has the same name as the one being added
		this.deleteLayer(options.name);

		// Layer options
		var layerOptions = {
			projection: Ushahidi.proj_4326,
			formatOptions: {
				extractStyles: true,
				extractAttributes: true,
			}
		};

		if (options.transform) {
			// Transform the feature geometry to spherical mercator
			layerOptions.preFeatureInsert = preFeatureInsert;
		}

		// Build out the fetch url
		var fetchURL = Ushahidi.baseURL + options.url;

		// Apply the report filters to the layer fetch URL except where
		// the layer type is KML
		if (layerType !== Ushahidi.KML) {
			var params = [];
			for (var _key in this._reportFilters) {
				params.push(_key + '=' + this._reportFilters[_key]);
			}

			// Update the fetch URL witht parameters
			fetchURL += (params.length > 0) ? '?' + params.join('&') : '';
			// Get the styling to use
			var styleMap = null;
			if (options.styleMap !== undefined) {
				styleMap = options.styleMap;
			} else {
				var style = Ushahidi.GeoJSONStyle();
				styleMap = new OpenLayers.StyleMap({
					"default": style,
					"select": style
				});
			}

			// Update the layer options with the style map
			layerOptions.styleMap = styleMap;
		}

		// Is there a callback for the data
		var layerFeatures = [];
		if (options.callback !== undefined) {
			$.ajax({
				url: fetchURL,
				async: false,
				success: function(response) {
					var jsonFormat = new OpenLayers.Format.JSON();
					var jsonStr = jsonFormat.write(options.callback(response));
					var format = new OpenLayers.Format.GeoJSON();
					layerFeatures = format.read(jsonStr);
				},
				dataType: "json"
			});
		} else {
			layerOptions.strategies = [new OpenLayers.Strategy.Fixed({preload: true})];

			// Set the protocol
			layerOptions.protocol = new OpenLayers.Protocol.HTTP({
				url: fetchURL,
				format: protocolFormat
			});
		}

		// Create the layer
		var layer = new OpenLayers.Layer.Vector(options.name, layerOptions);
		if (layerFeatures !== null && layerFeatures.length > 0) {
			layer.addFeatures(layerFeatures);
		}

		// Add the layer to the map
		var context = this;
		setTimeout(function(){ context._olMap.addLayer(layer); }, 1500);

		// Select Feature control
		this._selectControl = new OpenLayers.Control.SelectFeature(layer);
		this._olMap.addControl(this._selectControl);
		this._selectControl.activate();
		layer.events.on({
			"featureselected": this.onFeatureSelect,
			"featureunselected": this.onFeatureUnselect,
			scope: this
		});

		this._isLoaded = 1;

		return this;
	}
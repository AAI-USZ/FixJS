function() {

			$(this.el).html(this.template());
			this.map = new L.Map('tour-map');

			this.tile_layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			});

			// Add the tile layer to the map and set the view to the initial center and zoom
			this.map.addLayer(this.tile_layer).setView(
				new L.LatLng(this.options['init-lat'], this.options['init-lon']),
				this.options['init-zoom']
			);

			// Find stops with geo coordinate assets
			for (var i = 0; i<this.options.stops.size(); i++) {

				var tour_stop = this.options.stops.at(i);
				var asset_refs = tour_stop.get('assetRef');
				var result = _.each(asset_refs, function(asset_ref) {

					// Make sure this is a geo asset reference
					if ((asset_ref == undefined) || (asset_ref.usage != 'geo')) return;

					asset = tap.tourAssets.get(asset_ref.id);
					var data = $.parseJSON(asset.get('content')[0].data.value);

					if (data.type == 'Point') {
						var marker_location = new L.LatLng(data.coordinates[1], data.coordinates[0]);
						var marker = new L.Marker(marker_location);
						var template = TapAPI.templateManager.get('tour-map-marker-bubble');

						console.log(tour_stop.get('title')[0].value)
						marker.bindPopup(template({
							'title': tour_stop.get('title')[0].value
						})).openPopup();

						this.map.addLayer(marker);
					}

				}, this);

			}


			$(window).bind('orientationchange pageshow resize', this.resizeContentArea).resize();

			return this;
		}
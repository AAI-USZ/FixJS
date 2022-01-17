function(asset_ref) {

					// Make sure this is a geo asset reference
					if ((asset_ref == undefined) || (asset_ref.usage != 'geo')) return;

					asset = tap.tourAssets.get(asset_ref.id);
					var data = $.parseJSON(asset.get('content')[0].data.value);

					if (data.type == 'Point') {
						var marker_location = new L.LatLng(data.coordinates[1], data.coordinates[0]);
						var marker = new L.Marker(marker_location);
						var template = TapAPI.templateManager.get('tour-map-marker-bubble');

						marker.bindPopup(template({
							'title': tour_stop.get('title')[0].value
						})).openPopup();

						this.map.addLayer(marker);
					}

				}
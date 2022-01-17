function() {
			console.log('MapView.initialize');

			this.options.active_index = 'tourmap';

			this.tile_layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			});

			this.map = null;
			this.stop_markers = {};
			this.stop_popups = {};
			this.position_marker = null;
			this.view_initialized = false;
			this.LocationIcon = L.Icon.extend({
				iconUrl: tap.base_path + 'images/icon-locate.png',
				shadowUrl: null,
				iconSize: new L.Point(24, 24),
				iconAnchor: new L.Point(12, 12)
			});
			this.MarkerIcon = L.Icon.extend({
				iconUrl: tap.base_path + 'images/marker.png',
				shadowUrl: tap.base_path + 'images/marker-shadow.png',
				iconSize: new L.Point(25,41),
				iconAnchor: new L.Point(12,41)
			});
			this.marker_icon = new this.MarkerIcon();

			_.defaults(this.options, {
				'init-lat': 39.829104,
				'init-lon': -86.189504,
				'init-zoom': 2,
				'units': 'si'
			});
		}
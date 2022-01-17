function init() {
		if (!map) {
			// Disable webkit 3d CSS transformations for tile positioning
			// Causes lots of flicker in PhoneGap for some reason...
			L.Browser.webkit3d = false;
			map = new L.Map('map', {
				touchZoom: true, // force on for Android 3/4
				zoomControl: false // disable in favor of pinch-zoom
			});
			var tiles = new L.TileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
				maxZoom: 18,
				subdomains: '1234'
			});
			map.addLayer(tiles);

			map.attributionControl.setPrefix("");
			map.attributionControl.addAttribution(
				'<span class=".map-attribution">' + mw.message("attribution-mapquest") + '</span>'
				);
			map.attributionControl.addAttribution(
				'<br /><span class=".map-attribution">' + mw.message("attribution-osm") + '</span>'
				);

			$(".map-attribution a").bind('click', function(event) {
				// Force web links to open in external browser
				// instead of the app, where navigation will be broken.
				// TODO: define chrome
				// chrome.openExternalLink(this.href);
				event.preventDefault();
			});

			markerGroup = new L.LayerGroup();
			map.addLayer(markerGroup);
			setupPinchToZoom('map');
		}
	}
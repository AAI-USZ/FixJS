function(e) {
		points.push(e.latlng);

		if(points.length == 4) {
			map.addLayer(new R.PolygonGlow(points));

			points.length = 0;
		}

		var b = new R.BezierAnim([adelaide, e.latlng], {}, function() {
			var p = new R.Pulse(
					e.latlng, 
					6,
					{'stroke': '#2478ad', 'fill': '#30a3ec'}, 
					{'stroke': '#30a3ec', 'stroke-width': 3});

			map.addLayer(p);
			setTimeout(function() {
				map.removeLayer(b).removeLayer(p);
			}, 3000);
		});
		
		map.addLayer(b);
	}
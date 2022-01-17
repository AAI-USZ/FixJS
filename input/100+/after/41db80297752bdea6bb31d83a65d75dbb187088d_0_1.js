function(e) {
		points.push(e.latlng);

		if(points.length == 4) {
			var p = new R.Polygon(points);
			map.addLayer(p);
			p.hover(function() {

			},
			function() {
				console.log('out');
				p.animate({opacity: 0}, 1000, function() {map.removeLayer(p); console.log('done') });

			});

			points = [];
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
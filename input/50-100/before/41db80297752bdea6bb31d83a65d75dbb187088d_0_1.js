function() {
			var p = new R.Pulse(
					e.latlng, 
					6,
					{'stroke': '#2478ad', 'fill': '#30a3ec'}, 
					{'stroke': '#30a3ec', 'stroke-width': 3});

			map.addLayer(p);
			setTimeout(function() {
				map.removeLayer(b).removeLayer(p);
			}, 3000);
		}
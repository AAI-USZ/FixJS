function() {
				console.log('out');
				p.animate({opacity: 0}, 1000, function() {map.removeLayer(p); console.log('done') });

			}
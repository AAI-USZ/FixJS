function() {
		var gMap = this.gMap()
		if( typeof gMap != 'undefined' ) {
				var points = this.points(),
					allLats = points.map( function(el) { return parseFloat(el.lat) }),
					allLngs = points.map( function(el) { return parseFloat(el.lng) }),
					length = points.length,
					maxLats = Math.max.apply(Math, allLats),
					minLats = Math.min.apply(Math, allLats),
					maxLngs =  Math.max.apply(Math, allLngs),
					minLngs = Math.min.apply(Math, allLngs),
					globe = 256

			if( points.length > 1 ) { 
				var angleLng = maxLngs - minLngs,
					angleLng = angleLng < 0 ? angleLng + 360 : angleLng,
					angleLat = maxLats - minLats
					angle = angleLng > angleLat ? angleLng : angleLat,

					newCenter = new google.maps.LatLng( ( maxLats + minLats ) / 2, ( maxLngs + minLngs ) / 2 ),
					newZoom = Math.floor(Math.log(960 * 360 / angle / globe) / Math.LN2) - 2
					
			} else {
				newCenter = new google.maps.LatLng( points[0].lat, points[0].lng )
				newZoom = 14
			}

			 	gMap.setCenter(newCenter)
			 	gMap.setZoom(newZoom)

				return {center: newCenter, zoom: newZoom }
		}
	}
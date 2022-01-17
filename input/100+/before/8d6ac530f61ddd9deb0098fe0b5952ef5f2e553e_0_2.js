function() {
		var gMap = this.gMap()
		if( typeof gMap != 'undefined' ) {
				var points = this.points(),
					allLats = this.points().map( function(el) { return parseFloat(el.lat) }),
					allLngs = this.points().map( function(el) { return parseFloat(el.lng) }),
					maxLats = Math.max.apply(Math, allLats),
					minLats = Math.min.apply(Math, allLats),
					maxLngs =  Math.max.apply(Math, allLngs),
					minLngs = Math.min.apply(Math, allLngs),
					globe = 256,
					angleLng = maxLngs - minLngs,
					angleLng = angleLng < 0 ? angleLng + 360 : angleLng,
					angleLat = maxLats - minLats
					angle = angleLng > angleLat ? angleLng : angleLat,

					newCenter = new google.maps.LatLng( ( maxLats + minLats ) / 2, ( maxLngs + minLngs ) / 2 ),

					newZoom = Math.floor(Math.log(960 * 360 / angle / globe) / Math.LN2) - 2

			 	gMap.setCenter(newCenter)
			 	gMap.setZoom(newZoom)

				return {center: newCenter, zoom: newZoom }
		}
	}
function() {
		if( !ready() ) return []
		var rawPoints = ko.toJS( this.rawPoints ), gMap = this.gMap()
		for (var i=0; i < this.markers.length; i++) {
			this.markers[i].point.setMap(null)
		};
		for (var i=0; i < rawPoints.length; i++) {
			var row = rawPoints[i], latlng = row[this.field].latlng
			if( latlng != '' ) {
				var parse = latlng.split(','),
					point = new google.maps.LatLng(parse[0], parse[1]),
					content = this.infoContent(row)
					gPoint =  new google.maps.Marker({
						position: point,
						map: gMap,
						draggable: false,
						animation: google.maps.Animation.DROP,
						content: content
					})

				if( content != '' ) {
					info = this.info()
					google.maps.event.addListener( gPoint, 'click', function() {
						info.setContent(this.content)
						info.open(gMap,this)
					})
				} 

				this.markers.push( {
					lat: parse[0],
					lng: parse[1],
					point:gPoint
				});
			}
		};
		return this.markers
	}
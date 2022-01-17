function() {
		if (temp_kill) return; temp_kill = true;
		if (mapMoveTimeout) clearTimeout(mapMoveTimeout);
		mapMoveTimeout = setTimeout(function(){
			var bnds = map.getBounds();
			var ne = bnds.getNorthEast();
			var sw = bnds.getSouthWest();
			(function( ne, sw){
			// first clear all markers from the map //
				while(markers.length){ markers[0].setMap(null); markers.splice(0, 1); }
				$.ajax({
					url: '/get-markers',
					type : "POST",
					data : {ne : ne, sw : sw},
					success: function(markers){ addMarkers(markers); },
					error: function(jqXHR){ console.log('error', jqXHR.responseText+' :: '+jqXHR.statusText); }
				});
			})({ lat:ne.lat(), lng:ne.lng() }, { lat:sw.lat(), lng:sw.lng() });
		}, 100);
	}
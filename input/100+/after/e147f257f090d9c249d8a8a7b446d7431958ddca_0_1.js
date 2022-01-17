function (id, type) {
		var box = $("#"+id);
	
		var map = new Map(id);
		map.registerLocations(mapData.locations);
		map.registerIcons(mapData.icons);
		
		var markers = [];
		if (mapData.onCall[type] == null || mapData.onCall[type].address != 0) {
			markers.push({loc: 0, icon: "logo"});
		}
		
		if (mapData.onCall[type] != null) {
			var loc = mapData.onCall[type].location;
			markers.push({loc: loc, icon: "red"});
			
			map.setCenter(loc, 16);
			var infoBox = box.find(".info");
			map.map.moveByPx((infoBox.position().left / 2 + 5) * (1.3 * infoBox.width() / 170), 0);
			
		} else {
			map.setCenter(0, 14);
		}
		
		map.addMarkers(markers);
		
		maps[id] = map;
	}
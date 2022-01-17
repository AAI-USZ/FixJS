function (id, index) {
		var box = $("#"+id);
	
		var map = new Map(id);
		map.registerLocations(mapData.locations);
		map.registerIcons(mapData.icons);
		
		var markers = [{loc: index, icon: "red"}];
		if (mapData.addresses[index] != 0) {
			markers.push({loc: 0, icon: "logo"});
		}
		map.addMarkers(markers);
		
		map.setCenter(index, 16);
		map.map.moveByPx(box.find(".info").position().left / 2 + 15, 0);
		
		maps[id] = map;
	}
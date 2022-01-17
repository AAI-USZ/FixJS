function() {
	if (APP.userLocation.isSet) {
		var centerInfo = SONGMAP.getMapCenterInfo();
		$.ajax({
			type : "POST",
			url : "/songs/get",
			dataType : "json",
			data : {
				user : APP.username,
				lat : centerInfo.lat,
				lng : centerInfo.lng,
				zoom : centerInfo.zoom
			},
			success : APP.handleUserSongs
		});
	} else {
		setTimeout(APP.getSongs, 1000);
	}

}
function(centerinfo) {
	var data = {};
	if ((typeof centerinfo != "undefined") && (centerinfo != null)) {
		data = {
			lat : centerinfo.lat,
			lng : centerinfo.lng,
		}
	}

	// make the call
	$.ajax({
		type : "POST",
		url : "/songs/get",
		dataType : "json",
		data : data,
		success : APP.handleUserSongs
	});

}
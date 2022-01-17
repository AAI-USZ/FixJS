function getLocationIsps()
	{
		$.ajax({
			url: '/get-isps',
			type : "POST",
			data : {country : loc.country},
			success: function(isps){
				mdl.setLocation(loc.city, loc.state, isps);
			},
			error: function(jqXHR){
				console.log('error', jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
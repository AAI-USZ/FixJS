function writeToDatabase()
	{
		$.ajax({
			url: '/user',
			type : "POST",
			data : { isp : isp, status : status, lat : loc.lat, lng : loc.lng },
			success: function(data){
				console.log('ok');
			},
			error: function(jqXHR){
				console.log('error', jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
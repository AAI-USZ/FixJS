function(){

// from the database based on location ...
	var isps = ['Comcast', 'AT&T', 'Verizon', 'Other'];

// user generated variables //
	var isp, status, initialized;

	var loc = new LocationDetector();
	var map = new GoogleMap();
	var mdl = new ModalController();
	
	loc.getLocation(onLocationDetected);
	
	mdl.addListener('onIspSelected', function(isp){
		isp = isp;
		var o = { isp : isp, status : status, lat : loc.lat, lng : loc.lng };
		writeToDatabase(o);
		map.setUserIspAndStatus(isp, status);
		$('#header').show();
		$('#isp-dropdown-label').text(isp);
	});
	mdl.addListener('onStatusSelected', function(e){ status = e; });
	
	function onLocationDetected(ok, e)
	{
		if (e){
			console.log(e);
		} else{
			drawISPList();
			map.setLocation( { isp : isp, status : status, lat : loc.lat, lng : loc.lng } );
			if (!initialized) {
				map.getMarkers();
				mdl.setLocation(loc.city, loc.state, isps);
				initialized = true;
			}
		}
	}

	function drawISPList()
	{
		$('#isp-dropdown ul').empty();
		for (var i=0; i < isps.length; i++) $('#isp-dropdown ul').append("<li><a href='#'>"+isps[i]+"</a></li>");
	}

	function writeToDatabase(obj)
	{
		$.ajax({
			url: '/user',
			type : "POST",
			data : obj,
			success: function(data){
			//	console.log(data);
			},
			error: function(jqXHR){
				console.log('error', jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

// global nav //
	$('#btn-home').click(function(){ mdl.showHome(); });
	$('#btn-info').click(function(){ mdl.showInfo(); });
	$('#isp-dropdown ul').click(function(e){  isp = $(e.target).text(); $('#isp-dropdown-label').text(isp); map.setMenuIsp(isp); });
	
}
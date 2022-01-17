function(){

// from the database based on location ...
	var isps = ['Comcast', 'AT&T', 'Verizon', 'Other'];

// user generated variables //
	var initialized = false;

	var loc = new LocationDetector();
	var map = new GoogleMap();
	var mdl = new ModalController();
	
	loc.getLocation(onLocationDetected);
	
	mdl.addListener('onIspStatusChange', function(status, isp){
		onIspSelected(isp);
		map.setUserIspAndStatus(isp, status);
		writeToDatabase({ isp : isp, status : status, lat : loc.lat, lng : loc.lng });
		$('#header').show();
	});
	
	function onIspSelected(isp)
	{
		$('#isp-dropdown-label').text(isp);
	}
	
	function onLocationDetected(ok, e)
	{
		if (e){
			console.log('onLocationDetected :: '+e);
		} else{
			drawISPList();
			map.setLocation( { isp : isp, status : status, lat : loc.lat, lng : loc.lng } );
			if (initialized == false) {
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
	$('#isp-dropdown ul').click(function(e){  var isp = $(e.target).text(); onIspSelected(isp); map.showIsp(isp); });

}
function() {
		debug.geolocationStop();
		debug.compassStop();
		debug.accelerometerStop();
		debug.gyroscopeStop();
		
		debug.liveMonitor = true;
		$('#debug-DC').html("<p>Stopped</p>");
	}
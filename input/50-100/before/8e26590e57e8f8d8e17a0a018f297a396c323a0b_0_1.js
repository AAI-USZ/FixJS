function() {
		debug.liveMonitor = false;
		$('#debug-geoStoreFlag').prop("checked", true);
		$('#debug-compassStoreFlag').prop("checked", true);
		$('#debug-accelerometerStoreFlag').prop("checked", true);
		$('#debug-gyroscopeStoreFlag').prop("checked", true);
		
		storageAPI.reset();
		
		$('#debug-DC').html("<p>Initialised</p>");
	}
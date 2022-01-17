function() {
		debug.liveMonitor = false;
		//select storage for all
		$('#debug-geoStoreFlag').prop("checked", true);
		$('#debug-compassStoreFlag').prop("checked", true);
		$('#debug-accelerometerStoreFlag').prop("checked", true);
		$('#debug-gyroscopeStoreFlag').prop("checked", true);
		$("input[type='checkbox']").prop("checked",true).checkboxradio("refresh"); //refresh visual state
		
		storageAPI.reset();
		
		$('#debug-DC').html("<p>Initialised. Will store all data.</p>");
	}
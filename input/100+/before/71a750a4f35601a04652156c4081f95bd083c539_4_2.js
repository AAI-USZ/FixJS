function convertRunData(runID, runData) {
	var timeZone = (runData.hasOwnProperty('timeZone'))?runData.timeZone:runData.startTimeUtc.substr(19,6);

	var runInfo = {
		runID: runID,
		startTimeUTC: new Date(runData.startTimeUtc).toISOString(),
		timeZone: timeZone,
		duration: Math.round(runData.duration/1000),
		distance: Math.round(runData.distance*1000),
		minLat:  100000,
		maxLat: -100000,
		minLon:  100000,
		maxLon: -100000,
	};


	var deltaLats = [];
	var deltaLons = [];
	var deltaEles = [];
	
	var previousLat = 0;
	var previousLon = 0;
	var previousEle = 0;
	runData.geo.waypoints.forEach(function(wp) {

		deltaLats.push(Math.round(wp.lat*1000000-previousLat*1000000));
		deltaLons.push(Math.round(wp.lon*1000000-previousLon*1000000));
		deltaEles.push(Math.round(wp.ele*100-previousEle*100));

		previousLat = wp.lat;
		previousLon = wp.lon;
		previousEle = wp.ele;
	
		if (wp.lon < runInfo.minLon)
			runInfo.minLon = wp.lon;
		if (wp.lon > runInfo.maxLon)
			runInfo.maxLon = wp.lon;

		if (wp.lat < runInfo.minLat)
			runInfo.minLat = wp.lat;
		if (wp.lat > runInfo.maxLat)
			runInfo.maxLat = wp.lat;
	});

	runInfo.deltaLons = deltaLons;
	runInfo.deltaLats = deltaLats;
	runInfo.deltaEles = deltaEles;

	var hrData = null;
	runData.history.forEach(function(history) {
		if (history.type == 'HEARTRATE') {
			hrData = history.values;
		}
	});

	if (hrData != null) {
		var previousHR = 0;
		runInfo.deltaHRs = [];
		hrData.forEach(function(hr) {
			runInfo.deltaHRs.push(hr-previousHR);
			previousHR = hr;
		});
	}

	return runInfo;
}
function saveRunsToDB(dbClient, user, dbQueue, data, offset) {
	var response = JSON.parse(data);
	var activities = JSON.parse(data).activities;
	if (activities == undefined) {
		console.log('FAILURE for user '+user.userID+', offset '+offset+': '+data);
		return;
	}
	activities.forEach(function(activity) {
		var run = activity.activity;
		var runID = 'nike-'+run.activityId;
		var hasHRData = (run.metrics.hasOwnProperty('averageHeartRate') && (run.metrics.averageHeartRate != 0));
		// using replace here to guard against duplicates
		dbClient.query('replace into Runs (runID, userID, startTime, distance, duration, hasHRData, calories, externalID) values (?,?,?,?,?,?,?,?)',
						[runID, user.userID, run.startTimeUtc, Math.round(run.metrics.totalDistance*1000), Math.round(run.metrics.totalDuration/1000),
						 (hasHRData)?'yes':'no', run.metrics.totalCalories, run.activityId]);
		dbQueue.defer(retrieveRunGPSData, dbClient, dbQueue, user, runID, run);
	});
	if (activities.length > 0 && offset >= 0) {
		serverRequest('/partner/sport/run/activities', {access_token: user.nikeAccessToken, start: offset+NUMACTIVITIES, end: offset+NUMACTIVITIES+NUMACTIVITIES}, function(data) {
			saveRunsToDB(dbClient, user, dbQueue, data, offset+NUMACTIVITIES);
		});
	} else {
		dbQueue.await(function() {
			user.done = true;
			console.log('Done with user '+user.userID);
		});
	}
}
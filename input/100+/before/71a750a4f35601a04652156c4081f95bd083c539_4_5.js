function(activity) {
		var run = activity.activity;
		var timeZone = run.timeZone;
		if (timeZone.indexOf('GMT') < 0) {
			timeZone = 'GMT'+timeZone;
		}
		var runID = 'nike-'+run.activityId;
		var hasHRData = (run.metrics.hasOwnProperty('averageHeartRate') && (run.metrics.averageHeartRate != 0));
		// using replace here to guard against duplicates
		dbClient.query('replace into Runs (runID, userID, startTimeUTC, timeZone, distance, duration, hasHRData, calories, externalID) values (?,?,?,?,?,?,?,?,?)',
						[runID, userID, run.startTimeUtc, timeZone, Math.round(run.metrics.totalDistance*1000), Math.round(run.metrics.totalDuration/1000),
						 (hasHRData)?'yes':'no', run.metrics.totalCalories, run.activityId]);
		dbQueue.defer(retrieveRunGPSData, dbClient, dbQueue, userID, runID, run.activityId);
	}
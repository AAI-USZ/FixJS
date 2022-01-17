function(activity) {
		var run = activity.activity;
		var runID = 'nike-'+run.activityId;
		var hasHRData = (run.metrics.hasOwnProperty('averageHeartRate') && (run.metrics.averageHeartRate != 0));
		// using replace here to guard against duplicates
		dbClient.query('replace into Runs (runID, userID, startTime, distance, duration, hasHRData, calories, externalID) values (?,?,?,?,?,?,?,?)',
						[runID, user.userID, run.startTimeUtc, Math.round(run.metrics.totalDistance*1000), Math.round(run.metrics.totalDuration/1000),
						 (hasHRData)?'yes':'no', run.metrics.totalCalories, run.activityId]);
		dbQueue.defer(retrieveRunGPSData, dbClient, dbQueue, user, runID, run);
	}
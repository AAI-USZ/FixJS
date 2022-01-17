function(err, results, fields) {
		var activities = results;
		activities.forEach(function(run) {
			run.startTime = new Date(run.startTime);
		});

		activities.sort(function(a, b) { return b.startTime - a.startTime; });

		res.render('export', {activities: activities, userID: userID});

		user.done = false;
		user.runs = [];

		var dbQueue = queue(QUEUE_CONCURRENCY);
		if (activities.length == 0) {
			serverRequest('/partner/sport/run/activities', {access_token: user.nikeAccessToken, start: 0, end: NUMACTIVITIES}, function(data) {
				saveRunsToDB(dbClient, user, dbQueue, data, 0);
			});
		} else {
			serverRequest('/partner/sport/run/activities', {access_token: user.nikeAccessToken, startTime: activities[0].startTime.toISOString(), endTime: (new Date()).toISOString()}, function(data) {
				saveRunsToDB(dbClient, user, dbQueue, data, -1);
			});
		}
	}
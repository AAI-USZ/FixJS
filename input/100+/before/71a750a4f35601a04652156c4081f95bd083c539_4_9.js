function(dbClient, userID, res) {
	var user = getUser(userID);
	dbClient.query('select * from Runs where userID = ? order by startTimeUTC desc', [userID], function(err, results, fields) {
		var activities = results;
		activities.forEach(function(run) {
			var seconds = run.duration;
			if (run.duration < 60 * 60) {
				var minutes = Math.floor(seconds/60);
				seconds -= minutes*60;
				run.time = pad(minutes)+':'+pad(seconds);
			} else {
				var hours = Math.floor(seconds/3600);
				seconds -= hours*3600;
				var minutes = Math.floor(seconds/60);
				seconds -= minutes*60;
				run.time = pad(hours)+':'+pad(minutes)+':'+pad(seconds);
			}
		});
		res.render('export', {activities: activities, userID: userID});

		var dbQueue = queue(QUEUE_CONCURRENCY);
		if (activities.length == 0) {
			serverRequest('/partner/sport/run/activities', {access_token: user.nikeAccessToken, start: 0, end: NUMACTIVITIES}, function(data) {
				saveRunsToDB(dbClient, userID, user.nikeAccessToken, dbQueue, data, 0);
			});
		} else {
			serverRequest('/partner/sport/run/activities', {access_token: user.nikeAccessToken, startTime: activities[0].startTimeUTC.toISOString(), endTime: (new Date()).toISOString()}, function(data) {
				saveRunsToDB(dbClient, userID, user.nikeAccessToken, dbQueue, data, -1);
			});
		}
		
	});
}
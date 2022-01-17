function retrieveRunGPSData(dbClient, dbQueue, user, runID, run, done) {
	http.get('http://nikeplus.nike.com/plus/running/ajax/'+run.activityId, function(response) {
		var body = '';
		response.on('data', function(chunk) {
			body += chunk;
		});	
		response.on('end', function() {
			var hasGPS = 'no';
			try  {
				var runData = JSON.parse(body).activity;
				hasGPS = (runData.hasOwnProperty('geo')?'yes':'no');
			} catch (error) {
//				console.log(body);
				console.log(runID+': '+error);
				hasGPS = 'err';
/*
				if (body.indexOf('ENCOUNTERED') > 0) {
					console.log('retrying '+runID);
					dbQueue.defer(retrieveRunGPSData, dbClient, dbQueue, runID, externalID, done);
				}
*/
			}
			dbClient.query('update Runs set hasGPSData = ? where runID = ?', [hasGPS, runID]);
			console.log(run.activityId+':'+hasGPS);
			if (hasGPS == 'yes') {

				var runInfo = convertRunData(runID, runData);

				if (!fs.existsSync(DATADIR+user.userID)) {
					fs.mkdirSync(DATADIR+user.userID)
				}
				
				zlib.gzip(JSON.stringify(runInfo), function(error, compressedRun) {
					fs.writeFile(DATADIR+user.userID+'/'+runID+'.json.gz', compressedRun);
				});
				
				console.log(runInfo.deltaLats.length+' waypoints for run '+runID);			
				dbClient.query('update Runs set minLat = ?, maxLat = ?, minLon = ?, maxLon = ? where runID = ?',
							[runInfo.minLat, runInfo.maxLat, runInfo.minLon, runInfo.maxLon, runID]);
			}
			
			user.runs.push({
				runID:		runID,
				startTime:	run.startTimeUtc,
				distance:	Math.round(run.metrics.totalDistance*1000),
				duration:	Math.round(run.metrics.totalDuration/1000),
				hasHRData:	((run.metrics.hasOwnProperty('averageHeartRate') && (run.metrics.averageHeartRate != 0)))?'yes':'no',
				hasGPSData:	hasGPS,
				calories:	run.metrics.totalCalories,
				externalID:	run.activityId,
				exported:	'no'
			});
			
			done();
		});
	});
}
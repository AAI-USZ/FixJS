function() {
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
			console.log(externalID+':'+hasGPS);
			if (hasGPS == 'yes') {

				var runInfo = convertRunData(runID, runData);

				if (!fs.existsSync(DATADIR+userID)) {
					fs.mkdirSync(DATADIR+userID)
				}
				
				zlib.gzip(JSON.stringify(runInfo), function(error, compressedRun) {
					fs.writeFile(DATADIR+userID+'/'+runID+'.json.gz', compressedRun);
				});
				
				console.log(runInfo.deltaLats.length+' waypoints for run '+runID);			
				dbClient.query('update Runs set minLat = ?, maxLat = ?, minLon = ?, maxLon = ? where runID = ?',
							[runInfo.minLat, runInfo.maxLat, runInfo.minLon, runInfo.maxLon, runID]);
			}
			done();
		}
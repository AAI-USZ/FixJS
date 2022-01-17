function(err, data) {
		var runInfo = JSON.parse(data);
		
		var gpxDoc = builder.create();
	
		var gpxNode = gpxDoc.begin('gpx');
		gpxNode.att('version', '1.1');
		gpxNode.att('creator', 'http://eagerfeet.org/');
		gpxNode.att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
		gpxNode.att('xmlns:gpxtpx', 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1');
		gpxNode.att('xmlns', 'http://www.topografix.com/GPX/1/1');
		gpxNode.att('xsi:schemaLocation', 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/gpx/1/1/gpx.xsd\n'+
			'http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd');

		var time = new Date(runInfo.startTime);

		var runName = 'Run '+runInfo.startTime;
	
		var metadata = gpxNode.ele('metadata');
		metadata.ele('name').txt(runName);
	
		var b = metadata.ele('bounds');
		b.att('minlat', runInfo.minLat);
		b.att('maxlat', runInfo.maxLat);
		b.att('minlon', runInfo.minLon);
		b.att('maxlon', runInfo.maxLon);
	
		var trk = gpxNode.ele('trk');
	
		trk.ele('name').txt(runName);
		trk.ele('time').txt(runInfo.startTime);
		trk.ele('type').txt('Run');

		var deltaTime = runInfo.duration*1000/runInfo.deltaLons.length;
	
		var trkSeg = trk.ele('trkseg');

		var heartrates = runInfo.hasOwnProperty('deltaHRs');
	
		var timeOffset = 0;
		var hrIndex = 0;
		var heartRate = (heartrates)?runInfo.deltaHRs[0]:0;

		var lat = 0;
		var lon = 0;
		var ele = 0;
	
		for (var i = 0; i < runInfo.deltaLons.length; i += 1) {

			lat += runInfo.deltaLats[i]/1000000;
			lon += runInfo.deltaLons[i]/1000000;
			ele += runInfo.deltaEles[i]/100;
			
			var trkPt = trkSeg.ele('trkpt');
			trkPt.att('lat', lat);
			trkPt.att('lon', lon);

			trkPt.ele('ele').txt(''+ele);

			trkPt.ele('time').txt(time.toISOString());

			if (heartrates) {
				var previousIndex = hrIndex;
				hrIndex = Math.min(Math.floor(timeOffset/10000), runInfo.deltaHRs.length);
				if (hrIndex > previousIndex) {
					heartRate += runInfo.deltaHRs[hrIndex];
				}

				var ext = trkPt.ele('extensions');
				var trkPtExt = ext.ele('gpxtpx:TrackPointExtension');
				trkPtExt.ele('gpxtpx:hr').txt(''+heartRate);

				timeOffset += deltaTime;
			}
			
			time.setTime(time.getTime()+deltaTime);
		}
		
		callback(gpxDoc.toString(), 'Run-'+fileNameDateString(new Date(runInfo.startTime))+'.gpx');
	}
function(gpx, fileName) {
		res.setHeader('Content-Disposition', 'attachment; filename='+fileName);
		res.setHeader('Content-Type', 'application/gpx+xml');
		res.send(gpx);
	}
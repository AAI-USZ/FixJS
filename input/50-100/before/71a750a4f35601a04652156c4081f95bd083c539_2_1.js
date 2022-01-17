function exportGPX(req, res, runID) {
	createGPX(req.session.userID, runID, function(gpx, fileName) {
		res.setHeader('Content-Disposition', 'attachment; filename='+fileName);
		res.setHeader('Content-Type', 'application/gpx+xml');
		res.send(gpx);
	});
}
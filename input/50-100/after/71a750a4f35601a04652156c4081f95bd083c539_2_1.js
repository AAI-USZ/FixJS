function exportGPX(req, res, runID, dbClient) {
	createGPX(req.session.userID, runID, function(gpx, fileName) {
		dbClient.query('update Runs set exported = "yes" where runID = ?', [runID]);
		res.setHeader('Content-Disposition', 'attachment; filename='+fileName);
		res.setHeader('Content-Type', 'application/gpx+xml');
		res.send(gpx);
	});
}
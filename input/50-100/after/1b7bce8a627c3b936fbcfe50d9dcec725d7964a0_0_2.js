function(req, res) {
	console.log("Received from WSS: " + req.body.data);
	wss.emit("latlng", req.body.data)

	// console.log("Tracking provider: " + TrackingProvider)
	trackingProvider.save(req.body.data, function(error, docs) {
		// res.redirect('/')
		console.log("???" + error)
	});

	res.end("OK");
}
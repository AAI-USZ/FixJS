function(req, res) {
	console.log("Received from WSS: " + req.body.data);
	
	newData = {}
	newData['lat'] = req.body.data.lat
	newData['lng'] = req.body.data.lng
	newData['acc'] = req.body.data.acc
	
	wss.emit("latlng", newData)

	// console.log("Tracking provider: " + TrackingProvider)
	trackingProvider.save(newData, function(error, docs) {
		// res.redirect('/')
		console.log("???" + newData)
	});

	res.end("OK");
}
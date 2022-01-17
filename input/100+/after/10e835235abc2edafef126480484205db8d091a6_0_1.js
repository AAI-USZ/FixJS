function(req, res) {
	console.log("Received from HTTP POST: " + req.body.data);
	my_obj = JSON.parse(req.body.data)
	
	newData = {}
	newData['lat'] = my_obj.lat
	newData['lng'] = my_obj.lng
	newData['acc'] = my_obj.acc
	
	wss.emit("latlng", newData)

	// console.log("Tracking provider: " + TrackingProvider)
	trackingProvider.save(newData, function(error, docs) {
		// res.redirect('/')
		console.log("???" + newData)
	});

	res.end("OK");
}
function(req, res) {
	console.log("Received from HTTP POST: " + req.body.data);
	my_obj = JSON.parse(req.body.data)
	
//	newData = {}
//	newData['lat'] = my_obj.lat
//	newData['lng'] = my_obj.lng
//	newData['acc'] = my_obj.acc
	
	wss.emit("latlng", my_obj)

	// console.log("Tracking provider: " + TrackingProvider)
	trackingProvider.save(my_obj, function(error, docs) {
		// res.redirect('/')
		console.log("Lat/lng inserted")
	});

	res.end("OK");
}
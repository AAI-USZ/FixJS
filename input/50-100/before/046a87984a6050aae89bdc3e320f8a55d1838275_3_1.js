function(req, res) {
	_id=req.params._id;
	Venue.findOne({_id:_id}, function (err, doc) {
		if(!err){
			res.send(doc);
		}
	});	
}
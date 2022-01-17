function(req, res) {
	var now;
	var oneweek;
	if (req.params.start == undefined) {
		now = new Date();
	}
	if (req.params.end == undefined) {
		oneweek = new Date();
		oneweek.setDate(oneweek.getDate() + 7);
	}
	Event.find({$or:[{'time.end':{$gte:now}, 'time.start':{$lte:now}}, {'time.start':{$gte:now, $lte:oneweek}}]}).sort('time.start', 1).populate('venue').exec(function(err, events){
		if (err) {
			res.send(500, err);
		}else{
			res.send(200, events);
		}
	});
}
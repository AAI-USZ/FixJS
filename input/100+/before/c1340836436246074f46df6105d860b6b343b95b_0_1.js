function(req, res) {
	var start;
	var end;
	if (req.params.start == undefined) {
		start = new Date();
	}
	if (req.params.end == undefined) {
		end = new Date();
		end.setDate(end.getDate() + 7);
	}
	Event.find({$or:[{'time.end':{$gte:start}, 'time.end':{$lte:end}},{'time.start':{$lte:start}, 'time.start':{$gte:end}}]}).sort('time.start', 1).populate('venue').exec(function(err, events){
		if (err) {
			res.send(500, err);
		}else{
			res.send(200, events);
		}
	});
}
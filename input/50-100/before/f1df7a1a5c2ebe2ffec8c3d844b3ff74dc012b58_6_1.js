function(req, res, next){
	var proj = req.body,
		id = proj._id;
	
	delete proj._id;
	delete proj.tasks;
	
	Project.update({_id: id}, proj, null, function(err, result){
		if (err){
			res.send(500);
		} else {
			res.send();
		}
	});
}
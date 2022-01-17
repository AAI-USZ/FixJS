function(req, res, next){
	var id = req.body._id;
	ProjectSchema.updateProject(req.body, function(err, result){
		if (err){
			res.send(500);
			return;
		}
		ProjectSchema.retreiveProjectById(id, function(e, prj){
			if (e){
				res.send(500);
				return;
			}
			res.send(prj);
		});
	});
}
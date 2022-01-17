function(req, res, next) {
	req.body.tasks = undefined;
	
	var proj = new Project(req.body);
	proj.save(function(err, result){
		if (err){
			res.send(500);
		} else {
			User.findOne({_id: req.session.userId}, function(e, user){
				if (e){
					res.send(500);
				}
				user.currentProjects.push(proj);
				user.save(function(er, r){
					if (er){
						res.send(500);
					} else {
						res.send(proj);
					}
				});
			});
		}
	});
}
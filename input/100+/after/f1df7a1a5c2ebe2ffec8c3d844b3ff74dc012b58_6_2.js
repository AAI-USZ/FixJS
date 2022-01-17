function(req, res, next){
	if (req.session.authentication === 'done'){
		console.log(connectUtils);
		connectUtils.badRequest(res);
	} else {
		User.findOne({
			userName: req.body.userId, 
			password: req.body.password
		}).populate('organization').populate('currentProjects', ['name']).exec(function(error, result){
				if (error){
					res.send(500);
				} else {
					if (result) {
						result.password = undefined;
						
						req.session.authentication = 'done';
						req.session.userId = result._id;
						req.session.save();
						res.send(result);
						console.log('authenticated...');
					} else {
						connectUtils.unauthorized(res);
					}
				}
		});
	}
}
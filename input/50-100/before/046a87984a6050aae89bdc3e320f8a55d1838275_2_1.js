function(req, res) {
	var usr = createUserFromParams(req);
	console.log(usr);
	User.find(usr).exec(function(err, users) {
		if (!err) {
			console.log(users);
			res.send(users);
		} else {
			res.send(err);
		}
	});
}
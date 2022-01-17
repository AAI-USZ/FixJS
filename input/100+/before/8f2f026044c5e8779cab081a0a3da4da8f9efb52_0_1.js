function(req, res) {
	var user_id = req.params.u_id;
	var patch_id = req.params.p_id;
	var query = {
		_id: user_id
	};
	console.log('putUserPatch');
	User.findOne({
		_id: user_id
	}, function(err, user) {
		if (err) res.send(500, 'Error #020: ' + err);
		else {
			var found = false; // necessario controllare se la patch esiste 
			_.each(user.patches, function(patch) {
				console.log(patch);
				if (patch.id == patch_id) {
					patch.claimed = JSON.parse(req.params.claimed); // è passata come stringa, ogni stringa non vuota è TRUE
					found = true;
				}
			});
			if (!found) res.send(404, 'Error #021: Cannot find patch');
			User.update({
				_id: user_id
			}, {
				patches: user.patches
			}, function(err, num) {
				if (err) res.send(500, 'Error #021: ' + err);
				else res.send('/users/' + user_id);
			});
		}
	});
}
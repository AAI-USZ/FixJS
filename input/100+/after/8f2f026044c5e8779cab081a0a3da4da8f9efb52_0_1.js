function(req, res) {
	var user_id = req.params.u_id;
	var patch_id = req.params.p_id;
	if (!(req.params.claimed==='true' || req.params.claimed==='false')) res.send(400, "Error #021: Wrong parameter value"); //controlla che sia una stringa contenente un booleano
	else {
		var query = {
			_id: user_id
		};
		User.findOne({
			_id: user_id
		}, function(err, user) {
			if (err) res.send(500, 'Error #020: ' + err);
			else {
				var found = false; // necessario controllare se la patch esiste 
				_.each(user.patches, function(patch) {
					if (patch.id == patch_id) {
						patch.claimed = JSON.parse(req.params.claimed); // è passata come stringa, ogni stringa non vuota è TRUE
						found = true;
					}
				});
				if (!found) res.send(404, 'Error #022: Cannot find requested patch');
				User.update({
					_id: user_id
				}, {
					patches: user.patches
				}, function(err, num) {
					if (err) res.send(500, 'Error #023: ' + err);
					else res.send('/users/' + user_id);
				});
			}
		});
	}
}
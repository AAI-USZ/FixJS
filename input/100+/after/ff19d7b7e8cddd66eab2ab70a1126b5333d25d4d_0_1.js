function(err, token) {
	Security.isRequestSafe(req, function (result) {
		if(result == true) {
			console.log(req);
			console.log(req.headers);
			var data = {};
			data.key = req.headers['x-forwarded-for'];
			data.val = token;

			Storage.save('storage', data, function (result) {
				res.redirect('/done')
			});
		} else {
			res.send('Your request was identified as attack, stop it please.');
		}

		res.end;
	});
  }
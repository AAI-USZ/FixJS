function(req, res) {
		AM.deleteAccount(req.session.user, req.session.org, function(){
			res.clearCookie('email', {path : '/login' });
			res.clearCookie('passw', {path : '/login' });
			req.session.destroy(function(e){ res.send('ok', 200); });
		})
	}
function(req, res) {
		var auth = 'guest';
		
		if ( 'admin' === req.session.user.role || 'superadmin' === req.session.user.Id ) {
			auth = 'admin';
		}
		
		res.render('board/write', {
			title: 'write'
			, id : req.params.id
			, auth : auth
			, session: req.session.user
		});
	}
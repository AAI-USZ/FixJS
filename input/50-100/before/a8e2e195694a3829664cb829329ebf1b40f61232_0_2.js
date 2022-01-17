function(req, res){

		var sid = req.cookies.sid;

		if(sid !== undefined){
			getUser().clearSession(sid);
			res.clearCookie('SID');
		}

		res.send({result: 'ok'});	
	}
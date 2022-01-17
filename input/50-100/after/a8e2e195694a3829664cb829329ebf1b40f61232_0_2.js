function(req, res){

		var sid = req.cookies.SID;

		if(sid !== undefined){
			getUser().clearSession(sid);
			res.clearCookie('SID');
		}

		res.send({result: 'ok'});	
	}
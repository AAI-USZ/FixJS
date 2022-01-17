function(users){
			for (var i = users.length - 1; i >= 0; i--) users[i].user = users[i].ip == req.connection.remoteAddress;
			res.send(users, 200);
		}
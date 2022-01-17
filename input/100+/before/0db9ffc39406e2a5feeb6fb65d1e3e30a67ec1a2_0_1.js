function(data, socket, you) {
		if (!data) return;
		var youUser = resolveUser(you, socket);
		if (!youUser) return;
		console.log('CHALLENGE: '+youUser.name+' => '+data.userid+' ('+data.act+')');
		switch (data.act) {
		case 'make':
			if (typeof data.format !== 'string') data.format = 'debugmode';
			if (typeof data.userid !== 'string') return;
			var problems = Tools.validateTeam(youUser.team, data.format);
			if (problems) {
				emit(socket, 'message', "Your team was rejected for the following reasons:\n\n- "+problems.join("\n- "));
				return;
			}
			if (!Users.get(data.userid) || !Users.get(data.userid).connected) {
				emit(socket, 'message', "The user '"+data.userid+"' was not found.");
			}
			youUser.makeChallenge(data.userid, data.format);
			break;
		case 'cancel':
			youUser.cancelChallengeTo(data.userid);
			break;
		case 'accept':
			if (typeof data.userid !== 'string') return;
			var format = 'debugmode';
			if (youUser.challengesFrom[data.userid]) format = youUser.challengesFrom[data.userid].format;
			var problems = Tools.validateTeam(youUser.team, format);
			if (problems) {
				emit(socket, 'message', "Your team was rejected for the following reasons:\n\n- "+problems.join("\n- "));
				return;
			}
			youUser.acceptChallengeFrom(data.userid);
			break;
		case 'reject':
			if (typeof data.userid !== 'string') return;
			youUser.rejectChallengeFrom(data.userid);
			break;
		}
	}
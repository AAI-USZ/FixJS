function(user, formatid) {
		if (!user.connected) return;
		if (lockdown) {
			user.emit('message', 'The server is shutting down. Battles cannot be started at this time.');
			return;
		}

		formatid = toId(formatid);

		var team = user.team;
		var problems = Tools.validateTeam(team, formatid);
		if (problems) {
			user.emit('message', "Your team was rejected for the following reasons:\n\n- "+problems.join("\n- "));
			return;
		}

		// tell the user they've started searching
		var newSearchData = {
			userid: user.userid,
			format: formatid,
			room: selfR.id
		};
		user.emit('update', {searching: newSearchData, room: selfR.id});
		selfR.update();

		// get the user's rating before actually starting to search
		var newSearch = {
			userid: user.userid,
			formatid: formatid,
			team: team,
			rating: 1500
		};
		request({
			uri: config.loginserver+'action.php?act=ladderformatget&serverid='+config.serverid+'&format='+formatid+'&user='+user.userid,
		}, function(error, response, body) {
			if (body) {
				try {
					var data = JSON.parse(body);
					if (data && data.rpr) {
						newSearch.rating = parseInt(data.rpr,10);
					}
				} catch(e) {}
			}
			selfR.addSearch(newSearch, user);
		});
	}
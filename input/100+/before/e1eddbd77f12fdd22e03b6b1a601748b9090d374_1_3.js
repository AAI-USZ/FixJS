function(newSearch, user) {
		if (!user.connected) return;
		for (var i=0; i<selfR.searchers.length; i++) {
			var search = selfR.searchers[i];
			var searchUser = Users.get(search.userid);
			if (!searchUser || !searchUser.connected) {
				selfR.searchers.splice(i,1);
				i--;
				continue;
			}
			if (newSearch.formatid === search.formatid && Math.abs(newSearch.rating - search.rating) < 400) {
				if (searchUser === user) {
					return;
				}
				selfR.cancelSearch(user, true);
				selfR.cancelSearch(searchUser, true);
				user.emit('update', {searching: false, room: selfR.id});
				searchUser.team = search.team;
				selfR.startBattle(searchUser, user, search.formatid, true);
				return;
			}
		}
		selfR.searchers.push(newSearch);
	}
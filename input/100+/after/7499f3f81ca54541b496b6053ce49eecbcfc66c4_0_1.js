function(excludeUser) {
		var update = selfR.getUpdate(selfR.lastUpdate, !selfR.usersChanged, !selfR.roomsChanged);
		update.room = selfR.id;
		if (selfR.log.length > 100) selfR.log = selfR.log.slice(-100);
		selfR.lastUpdate = selfR.log.length;
		for (var i in selfR.users) {
			if (selfR.users[i] === excludeUser) continue;
			selfR.users[i].emit('update', update);
		}
		selfR.usersChanged = false;
		selfR.roomsChanged = false;
	}
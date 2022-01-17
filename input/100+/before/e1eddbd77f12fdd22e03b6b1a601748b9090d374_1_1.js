function(user) {
		var slot = 0;
		if (selfR.rated) {
			if (selfR.rated.p1 === user.userid) {
				slot = 1;
			} else if (selfR.rated.p2 === user.userid) {
				slot = 2;
			} else {
				return;
			}
		}

		selfR.cancelReset();
		selfR.battle.join(user, slot);
		selfR.active = selfR.battle.active;
		selfR.update();

		if (selfR.parentid) {
			getRoom(selfR.parentid).updateRooms();
		}
	}
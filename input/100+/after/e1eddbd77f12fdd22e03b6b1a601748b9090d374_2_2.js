function(user, slot, team) {
		if (selfB.p1 && selfB.p1.user && selfB.p2 && selfB.p2.user) return false;
		if (!user) return false; // !!!
		if (user.sides[selfB.roomid]) return false;
		if (selfB.p1 && selfB.p1.user || slot === 2) {
			if (selfB.started) {
				user.sides[selfB.roomid] = selfB.p2;
				selfB.p2.user = user;
				user.sides[selfB.roomid].name = user.name;
			} else {
				console.log("NEW SIDE: "+user.name);
				selfB.p2 = new BattleSide(user, selfB, 1, team);
				selfB.sides[1] = selfB.p2;
				user.sides[selfB.roomid] = selfB.p2;
			}
			selfB.add('player', 'p2', selfB.p2.name, selfB.p2.user.avatar);
		} else {
			if (selfB.started) {
				user.sides[selfB.roomid] = selfB.p1;
				selfB.p1.user = user;
				selfB.p1.name = user.name;
			} else {
				console.log("NEW SIDE: "+user.name);
				selfB.p1 = new BattleSide(user, selfB, 0, team);
				selfB.sides[0] = selfB.p1;
				user.sides[selfB.roomid] = selfB.p1;
			}
			selfB.add('player', 'p1', selfB.p1.name, selfB.p1.user.avatar);
		}
		selfB.start();
		return true;
	}
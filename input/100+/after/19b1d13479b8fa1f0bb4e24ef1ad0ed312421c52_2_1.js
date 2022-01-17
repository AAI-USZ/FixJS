function () {
		var room, result, rooms, monster, monList;

		room = getRoom();

		if (!room) {
			return false;
		}

		rooms = [];

		do {
			rooms.push([room.x * 5 + room.xsize / 2, room.y * 5 + room.ysize / 2]);
		} while (room.getNext());

		while (rooms.length > 0) {
			rooms.sort(Sort.points);
			room = rooms.shift();

			result = Pather.getNearestWalkable(room[0], room[1], 15, 2);

			if (result) {
				Pather.moveTo(result[0], result[1], 3);

				monList = [];
				monster = getUnit(1);

				if (monster) {
					do {
						if ([38, 39, 40, 41, 42, 631, 632, 633].indexOf(monster.classid) > -1 && getDistance(me, monster) <= 30 && Attack.checkMonster(monster)) {
							monList.push(copyUnit(monster));
						}
					} while (monster.getNext());
				}

				if (!Attack.clearList(monList)) {
					return false;
				}
			}
		}

		return true;
	}
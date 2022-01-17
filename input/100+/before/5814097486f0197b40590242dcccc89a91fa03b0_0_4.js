function () {
		Town.doChores();
		Pather.useWaypoint(101);
		Precast.doPrecast(true);
		Pather.moveToExit(102, true);
		Pather.moveTo(17591, 8070);
		Pather.makePortal();

		var monsta,
			monList = [];

		monsta = getUnit(1);

		if (monsta) {
			do {
				if (Attack.checkMonster(monsta) && getDistance(me, monsta) <= 25) {
					monList.push(copyUnit(monsta));
				}
			} while (monsta.getNext());
		}

		Attack.clearList(monList);
		say("1");

		while (!this.playerIn()) {
			Pather.moveTo(17591, 8070);
			delay(250);
		}

		Attack.kill("mephisto");
		say("a4");
		Pather.moveTo(17591, 8070);
		delay(2000);
		Pather.usePortal(null);

		return true;
	}
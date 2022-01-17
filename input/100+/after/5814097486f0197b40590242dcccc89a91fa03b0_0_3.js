function () {
		if (me.inTown) {
			Town.doChores();
			Pather.useWaypoint(46);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit(getRoom().correcttomb, true) || !Pather.moveToPreset(me.area, 2, 152)) {
			throw new Error("duriel failed");
		}

		Pather.makePortal();
		Attack.clear(25);
		say("1");

		while (!this.playerIn()) {
			Pather.moveToPreset(me.area, 2, 152, 0, -5);
			delay(250);
		}

		while (this.playerIn()) {
			delay(250);
		}

		while (!getUnit(2, 100)) {
			delay(250);
		}

		Pather.useUnit(2, 100, 73);
		Attack.kill(211);
		// duriel's cave is... awkward. it allows tele only to specific spots
		Pather.moveTo(22629, 15712);
		Pather.moveTo(22612, 15709);
		Pather.moveTo(22579, 15705);
		Pather.moveTo(22577, 15649);
		Pather.moveTo(22577, 15614);
		Pather.makePortal();
		say("1");

		while (!this.playerIn()) {
			delay(250);
		}

		Pather.usePortal(null, me.name);
		say("a3");
		Pather.useWaypoint(75);

		while (!this.playersInAct(3)) {
			delay(250);
		}

		return true;
	}
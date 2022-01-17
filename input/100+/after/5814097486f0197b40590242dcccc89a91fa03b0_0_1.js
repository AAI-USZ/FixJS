function () {
		Town.doChores();
		Pather.useWaypoint(35);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([36, 37], true) || !Pather.moveTo(22587, 9577)) {
			throw new Error("andy failed");
		}

		Pather.makePortal();
		Attack.clear(25);
		say("1");

		while (!this.playerIn()) {
			Pather.moveTo(22587, 9577);
			delay(250);
		}

		Attack.kill(156);
		Pather.moveTo(22587, 9577);
		Pather.usePortal(null, me.name);
		say("a2");
		Pather.useWaypoint(40);

		while (!this.playersInAct(2)) {
			delay(250);
		}

		return true;
	}
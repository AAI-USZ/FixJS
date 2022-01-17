function () {
		this.getLayout = function (seal, value) {
			var sealPreset = getPresetUnit(108, 2, seal);

			if (!seal) {
				throw new Error("Seal preset not found. Can't continue.");
			}

			if (sealPreset.roomy * 5 + sealPreset.y === value || sealPreset.roomx * 5 + sealPreset.x === value) {
				return 1;
			}

			return 2;
		};

		this.initLayout = function () {
			this.vizLayout = this.getLayout(396, 5275);
			this.seisLayout = this.getLayout(394, 7773);
			this.infLayout = this.getLayout(392, 7893);
		};

		this.getBoss = function (name) {
			var i, boss,
				glow = getUnit(2, 131);

			for (i = 0; i < (name === getLocaleString(2853) ? 12 : 10); i += 1) {
				boss = getUnit(1, name);

				if (boss) {
					return Attack.clear(40, 0, name);
				}

				delay(250);
			}

			return !!glow;
		};

		this.openSeal = function (classid) {
			var i, seal, warn;

			switch (classid) {
			case 396:
			case 394:
			case 392:
				warn = true;
				break;
			default:
				warn = false;
				break;
			}

			for (i = 0; i < 5; i += 1) {
				Pather.moveToPreset(me.area, 2, classid, classid === 394 ? 5 : 2, classid === 394 ? 5 : 0);

				seal = getUnit(2, classid);

				if (!seal) {
					return false;
				}

				if (seal.mode) { // for pubbies
					if (warn) {
						say("Leave the seals alone you soggy cunt!");
					}

					return true;
				}

				warn = false;

				seal.interact();
				delay(classid === 394 ? 1000 : 500);

				if (!seal.mode) {
					if (classid === 394 && Attack.validSpot(seal.x + 15, seal.y)) { // de seis optimization
						Pather.moveTo(seal.x + 15, seal.y);
					} else {
						Pather.moveTo(seal.x - 5, seal.y - 5);
					}

					delay(500);
				} else {
					return true;
				}
			}

			return false;
		};

		this.vizierSeal = function () {
			if (!this.openSeal(395) || !this.openSeal(396)) {
				throw new Error("Failed to open Vizier seals.");
			}

			if (this.vizLayout === 1) {
				Pather.moveTo(7691, 5292);
			} else {
				Pather.moveTo(7695, 5316);
			}

			if (!this.getBoss(getLocaleString(2851))) {
				throw new Error("Failed to kill Vizier");
			}

			return true;
		};

		this.seisSeal = function () {
			if (!this.openSeal(394)) {
				throw new Error("Failed to open de Seis seal.");
			}

			if (this.seisLayout === 1) {
				Pather.moveTo(7771, 5196);
			} else {
				Pather.moveTo(7798, 5186);
			}

			if (!this.getBoss(getLocaleString(2852))) {
				throw new Error("Failed to kill de Seis");
			}

			return true;
		};

		this.infectorSeal = function () {
			if (!this.openSeal(393) || !this.openSeal(392)) {
				throw new Error("Failed to open Infector seals.");
			}

			if (this.infLayout === 1) {
				delay(1);
			} else {
				Pather.moveTo(7928, 5295); // temp
			}

			if (!this.getBoss(getLocaleString(2853))) {
				throw new Error("Failed to kill Infector");
			}

			return true;
		};

		Town.doChores();
		Pather.useWaypoint(107);
		Precast.doPrecast(true);
		Pather.moveTo(7790, 5544);
		this.initLayout();
		this.vizierSeal();
		this.seisSeal();
		this.infectorSeal();
		Pather.moveTo(7763, 5267);
		Pather.makePortal();
		say("1");

		while (!this.playerIn()) {
			delay(250);
		}

		while (!getUnit(1, 243)) {
			delay(500);
		}

		Attack.kill(243);

		if (!Pather.usePortal(null, me.name)) {
			Town.goToTown();
		}

		return true;
	}
function () {
			if (!this.settings.updateInterval) throw { name: 'ArgumentInvalid', message: 'settings.updateInterval not set' };
			this.timer = new Timer();
			this.timer.elapsed.add(this.update, this);
			this.scheduleUpdate = function () {
				console.log(interpolate('{{0}}: Next check scheduled in {{1}} seconds', [ this.name, this.settings.updateInterval ]));
				this.timer.start(this.settings.updateInterval);
			};
			this.updateFinished.add(this.scheduleUpdate, this);
			this.update();
		}
function (avoidTransition) {
		console.info("DRAGGED'N'DROPPED");

		var area = this.getArmArea();

		if (this._powerON || (this.options.mode == 'automatic' && !this._powerON)) {
			this.switchOnTheButton();

			if (area == 'track') {
				this.play(avoidTransition);
			}
			else if (area == 'start') {
				this.play();
			}
			else if (area == 'end') {
				this.end();
			}
		}
	}
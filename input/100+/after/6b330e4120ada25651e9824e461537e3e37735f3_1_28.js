function (avoidTransition) {
		console.info('END');

		if (!avoidTransition)
			avoidTransition = false

		var o = {};
		o.transition = 'stop';
		this.pauseTransitions();

		if (this._player.currentTime) {
			this.pause();
			this._player.currentTime = 0;
		}

		if (this.options.mode != 'manual')
			this.startDiscRotation({
				easing: this.options.easing.stop,
				withTransition: avoidTransition ? false : this.options.useTransitions,
				transition: avoidTransition || this.options.mode == 'automatic' ? 'stop' : 'manualstop'
			});

		if (avoidTransition || !this.options.useTransitions) {
			if (this.options.mode == 'automatic' && this._armRotation != 0)
				this.placeTheArmOffTheDisc();

			this.enableRemote('stop');

			if (!this._needRestart && this.options.mode != 'manual')
				this.switchOffTheButton();
		}
		else {
			if (this.options.mode != 'automatic' && this.options.endTransitionDuration)
				o.duration = this.options.endTransitionDuration;
			this.playTransition(o);
		}
	}
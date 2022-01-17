function (event) {
		console.info('Audio player "' + event.target.id + '" event: loadedData.');

		if (event.target.id == 'turntable-player') {
			this.enableRemote('playerLoaded');

			if (this.options.mode != 'automatic') {
				this.updateTrackInfos();
				this.updateInfos();
				this.updatePlayerPosition();
			}

			if (this.options.mode == 'automatic' && (!this._playerPaused || this._inTransition))
				this.restart();
		}
	}
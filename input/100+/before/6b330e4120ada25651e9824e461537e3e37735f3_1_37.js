function (event) {
		if (event.target.id == 'turntable-player' && !this._playerPaused) {
			console.info('Player event: ended.');
			this.end();
		}
		else {
			var 
				r = /turntable-player-transition/i,
				s = event.target.id
			;
			if (r.test(s)) {
				this._inTransition = false;
				if (event.target.id == 'turntable-player-transition-start')
					this.play(true);
				else if (event.target.id == 'turntable-player-transition-stop')
					this.end(true);
			}
		}
	}
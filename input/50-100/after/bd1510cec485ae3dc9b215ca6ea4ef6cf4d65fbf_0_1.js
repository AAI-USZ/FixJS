function () {
		var time = L.Transition.getTime(),
			elapsed = time - this._startTime,
			duration = this.options.duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easing(elapsed / duration));
		} else {
			this._runFrame(1);
			this._complete();
		}
	}
function () {
		this.disableRemote('start');

		if (this._armFt) {
			this._armFt.setOpts({ animate: true }, this._armFtCallback);
			this._armFt.attrs.rotate = this.options.themes[this.options.theme].arm.area.start;
			this._armFt.apply();
		}
		else {
			this._armInPlace = true;
			this.play();
			this.enableRemote('start');
		}
	}
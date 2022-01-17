function () {
		if (this._armRotation != 0) {
			this.disableRemote('stop');

			if (this._armFt) {
				this.rotateArmShadow(0, true);
				this._armFt.setOpts({ animate: true }, this._armFtCallback);
				this._armFt.attrs.rotate = 0;
				this._armFt.apply();
			}
			else {
				this._armInPlace = false;
				this.end(true);
			}
		}
	}
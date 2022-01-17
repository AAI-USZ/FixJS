function () {
		if (!this._disc) {
			this.checkCssAnimations();

			if (this.options.useCssAnimations) {
				this.initTurntableDisc();
			}
			else {
				this.initTurntableDiscUsingSVG();
			}

			this.initTurntableArm();
		}
	}
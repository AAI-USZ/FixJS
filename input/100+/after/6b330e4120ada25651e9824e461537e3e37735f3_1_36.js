function () {
		if (this.options.useCssAnimations)
			stopDiscRotationUsingCSS();
		else
			stopDiscRotationUsingSVG();

		this._inRotation = false;
	}
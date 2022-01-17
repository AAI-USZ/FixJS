function (element) {
		if (element && this._inRotation) {
			if (this.options.useCssAnimations)
				updateDiscRotationIndexUsingCSS(element);
			else
				updateDiscRotationIndexUsingSVG(element);
		}
	}
function () {
		if (this.options.useCssAnimations) {
			if (this._disc && this.options.themes[this.options.theme].disc.turnable)
				this._disc.style[this._cssAnimation.animationPlayState] = 'paused';
			if (this._discTitle && this.options.themes[this.options.theme].disc.title.turnable)
				this._discTitle.style[this._cssAnimation.animationPlayState] = 'paused';
			this.updateDiscRotationIndex(this._disc);
		}
		else {
			if (this._disc && this.options.themes[this.options.theme].disc.turnable)
				this.updateDiscRotationIndex(this._disc.stop());
			if (this._discTitle && this.options.themes[this.options.theme].disc.title.turnable)
				this._discTitle.stop();
			if (this._discCover && this.options.themes[this.options.theme].disc.cover.turnable)
				this._discCover.stop();
		}

		this._inRotation = false;
	}
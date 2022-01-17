function (options) {
		var
			self = this,
			o = options || {},
			easing = o.easing || 'linear',
			name = o.transition || 'none',
			time = o.duration || 0
		;

		if (o.withTransition == undefined || !this.options.useTransitions)
		  o.withTransition = this.options.useTransitions;

		if (name == 'track')
			time = this._player.duration - this._player.currentTime;
		else if (name == 'manualstart' || name == 'manualstop')
			time = this.options.autoStop / 1000;
		else if (o.withTransition)
			time = this.options.animateDelay + this.options.transitions[name].duration / 1000
		else
			time = this.options.animateDelay / 1000;

		var
			deg = parseInt(this.options.rpm * 360 * time / 60) + this._discRotation,
			s = time + 1
		;

		if (this.options.useCssAnimations)
			this.startDiscRotationUsingCSS(deg, s);
		else
			this.startDiscRotationUsingSVG(deg, s);

		this._inRotation = true;

		console.info('Rotation "' + name + '": ' + deg + 'deg for ' + s + 's.');
	}
function () {
		if (this.options.useCssAnimations) {
			var
				animation = false,
				transformString = 'transform',
				animationString = 'animation',
				animationPlayState = 'animationPlayState',
				domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
				vendorPrefix = '',
				pfx  = '',
				turntable = this._wrapper
			;

			this._cssAnimation.animationString = animationString;
			this._cssAnimation.animationPlayState = animationPlayState;
			this._cssAnimation.vendorPrefix = vendorPrefix;
			this._cssAnimation.pfx = pfx;

			if (turntable.style.animationName)
				animation = true;

			if (animation === false) {
				for ( var i = 0; i < domPrefixes.length; i++ ) {
					if (turntable.style[ domPrefixes[i] + 'AnimationName' ] !== undefined) {
						pfx = domPrefixes[ i ];
						vendorPrefix = '-' + pfx.toLowerCase() + '-';

						this._cssAnimation.transformString = pfx + transformString.ucfirst();
						this._cssAnimation.animationString = pfx + animationString.ucfirst();
						this._cssAnimation.animationPlayState = pfx + animationPlayState.ucfirst();
						this._cssAnimation.vendorPrefix = vendorPrefix;
						this._cssAnimation.pfx = pfx;

						animation = true;

						break;
					}
				}
			}

			if (animation === false)
				this.options.useCssAnimations = false;
		}

		return this.options.useCssAnimations;
	}
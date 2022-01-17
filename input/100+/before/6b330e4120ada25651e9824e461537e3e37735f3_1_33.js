function () {
		if (this.options.useCssAnimations) {
			var 
				animation = false,
				animationstring = 'animation',
				animationPlayState = 'animationPlayState',
				domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),  
				keyframeprefix = '',  
				pfx  = '',
				turntable = this._wrapper
			;  

			this._cssAnimation.animationstring = animationstring;
			this._cssAnimation.animationPlayState = animationPlayState;
			this._cssAnimation.keyframeprefix = keyframeprefix;
			this._cssAnimation.pfx = pfx;

			if (turntable.style.animationName)
				animation = true;      

			if (animation === false) {
				for ( var i = 0; i < domPrefixes.length; i++ ) {
					if (turntable.style[ domPrefixes[i] + 'AnimationName' ] !== undefined) {
						pfx = domPrefixes[ i ];  
						keyframeprefix = '-' + pfx.toLowerCase() + '-';  

						this._cssAnimation.animationstring = pfx + animationstring.ucfirst();
						this._cssAnimation.animationPlayState = pfx + animationPlayState.ucfirst();
						this._cssAnimation.keyframeprefix = keyframeprefix;
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
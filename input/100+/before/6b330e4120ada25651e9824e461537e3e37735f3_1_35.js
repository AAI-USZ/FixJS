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
			s = time + 1,
			ms = parseInt(s * 1000)
		;

		s = Math.round(s * 100) / 100;

		if (this.options.useCssAnimations) {
			this._cssAnimation.rotationIteration = 360;
			var 
				anim = 'rotate' + deg + ' ' + s + 's linear forwards',
				keyframes = 
					'@' + this._cssAnimation.keyframeprefix + 'keyframes rotate' + deg + ' {'
					+ 'from {' + this._cssAnimation.keyframeprefix + 'transform: rotate(' + this._discRotation + 'deg) }'
					+ 'to {' + this._cssAnimation.keyframeprefix + 'transform: rotate(' + deg + 'deg) }'
					+ '}'
			;

		  if (document.styleSheets && document.styleSheets.length)
	      document.styleSheets[0].insertRule(keyframes, 0);
		  else {  
				var st = document.createElement('style');  
				st.innerHTML = keyframes;  
				document.getElementsByTagName('head')[0].appendChild(st);  
 			}

			if (this._disc && this.options.themes[this.options.theme].disc.turnable) {
				this._disc.style[this._cssAnimation.animationPlayState] = 'running';
				this._disc.style[this._cssAnimation.animationstring] = anim;
			}
			if (this._discTitle && this.options.themes[this.options.theme].disc.title.turnable) {
				this._discTitle.style[this._cssAnimation.animationPlayState] = 'running';
				this._discTitle.style[this._cssAnimation.animationstring] = anim;
			}
		}
		else {
			if (this._disc && this.options.themes[this.options.theme].disc.turnable)
				this._disc.animate({ transform: 'r' +	deg}, ms, 'linear', function () {
					self.updateDiscRotationIndex(this);
				});
			if (this._discTitle && this.options.themes[this.options.theme].disc.title.turnable)
				this._discTitle.animate({ transform: 'r' +	deg}, ms, 'linear');
			if (this._discCover && this.options.themes[this.options.theme].disc.cover.turnable)
				this._discCover.animate({ transform: 'r' +	deg}, ms, 'linear');
		}

		this._inRotation = true;

		console.info('Rotation "' + name + '": ' + deg + 'deg for ' + s + 's.');
	}
function() {
		if (_noVal(this) ) {
			var _duration = defaults.duration;
			var _label = _getLabel(this);
			var _to ={ opacity:1 };

			if (defaults.noAnimate) {
				_label.show();
				return false;
			}
			
			if (defaults.slide) {
				_to.left = defaults.labelLeft;
			} else {
				_duration = defaults.fadeDuration;
			}
			
			_label.animate(_to, _duration, defaults.easingOut);
		}
	}
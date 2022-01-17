function(delay) {
			var self = this;
			this._show = true;

			// Avoid button flicker on instant content
			if (this._defaultContent)
				this.$trigger.addClass(this.settings.activeClass);

			delay ? setTimeout(function(){self._open()}, delay) : this._open(); // Using a delay value of `0` would still
			                                                                    // create a noticeable visual effect
		}
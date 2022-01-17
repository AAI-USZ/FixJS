function() {
				var slide = getState(this);
				interval = this.getAttribute('data-interval') || 2000;
				if (slide[0] >= slide[1] && !loop) {
					return;
				};
				this.xtag.slideNext.call(this);
				currentTimeout = setTimeout(this.next.bind(this),interval);
			}
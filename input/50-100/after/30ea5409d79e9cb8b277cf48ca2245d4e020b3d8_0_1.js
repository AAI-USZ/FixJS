function() {
				var slide = getState(this);
				interval = this.getAttribute('data-interval') || 2000;
				if (slide[0] >= slide[1] && !loop) {
					return;
				};
				this.xtag.slideNext.call(this);
				console.log("calling set timeout for the next slide");
				return currentTimeout = setTimeout(next.bind(this),interval);
			}
function (event) {
			// cancel timeout when clicking
			if(event) clearInterval(this.timer);

			var width = $(this.elements[0]).outerWidth(true);
			var viewBound = Math.ceil(this.wrapper.width() / width);

			// cancel if bound is reached and momentum is false
			if(viewBound + this.index >= this.bound && !this.options.momentum) return false;
			// continue with first slide if momentum is true
			if(viewBound + this.index >= this.bound && this.options.momentum) {
				this.index = -1;
			}

			// increment settings
			this.index = this.index + 1;

			// move
			this.move();
		}
function (event) {
			// cance timeout when clicking
			if(event) clearInterval(this.timer);

			var width = $(this.elements[0]).outerWidth(true);
			var viewBound = Math.ceil(this.wrapper.outerWidth(true) / width);

			// cancel if bound is reached and momentum is false
			if(this.index <= 0 && !this.options.momentum) return false;
			// continue with last slide if momentum is true
			if(this.index <= 0 && this.options.momentum) {
				this.index = this.bound - viewBound + 1;
			}

			// increment settings
			this.index = this.index - 1;

			// move
			this.move();
		}
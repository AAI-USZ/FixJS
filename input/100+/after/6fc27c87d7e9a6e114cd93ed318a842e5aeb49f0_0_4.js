function (index) {
			// set new index if neccessary
			this.index = (index !== undefined) ? index : this.index;

			var width = $(this.elements[0]).outerWidth(true);
			var viewBound = Math.ceil(this.wrapper.width() / width);
			var moveBound = (this.options.move === 'single') ? 1 : viewBound;
			var position = -(width * (this.index * moveBound));

			// animation settings
			this.viewport.stop().animate({
				'left': position
			}, this.options.duration);

			// change active navigation
			this.navigation.removeClass(this.options.cls.active);
			this.navigation.eq(this.index).addClass(this.options.cls.active);

			// add appropriate classes to left trigger
			if(this.index <= 0) {
				this.triggerLeft.addClass(this.options.cls.disabled);
				this.triggerRight.removeClass(this.options.cls.disabled);
			} else {
				this.triggerLeft.removeClass(this.options.cls.disabled);
			}
			// add appropriate classes to right trigger
			if(viewBound + this.index >= this.bound) {
				this.triggerLeft.removeClass(this.options.cls.disabled);
				this.triggerRight.addClass(this.options.cls.disabled);
			} else {
				this.triggerRight.removeClass(this.options.cls.disabled);
			}

			// check if we should disable the arrows
			if(viewBound >= this.bound) {
				this.triggerLeft.addClass(this.options.cls.disabled);
				this.triggerRight.addClass(this.options.cls.disabled);
			}
		}
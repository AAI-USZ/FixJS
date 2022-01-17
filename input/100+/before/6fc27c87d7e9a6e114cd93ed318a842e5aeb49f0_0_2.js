function () {
			// calculate container height
			this.wrapper.css('height', this.viewport.height());
			// calculate viewport width
			this.viewport.css('width', this.elements.length * this.elements.outerWidth(true));
		}
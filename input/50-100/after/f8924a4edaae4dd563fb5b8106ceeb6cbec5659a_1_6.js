function() {

		var wrapperSize = this.getSize();
		var contentSize = this.getScrollSize();

		if (this.options.momentum) {
			if (this.options.scrollY && contentSize.y <= wrapperSize.y) this.contentElement.setStyle('min-height', wrapperSize.y + 1);
			if (this.options.scrollX && contentSize.x <= wrapperSize.x) this.contentElement.setStyle('min-width',  wrapperSize.x + 1);
		}

		return this;
	}
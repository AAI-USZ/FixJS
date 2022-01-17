function(element, options) {
		this.setOptions(options);
		this.element = document.id(element);

		if(this.element === null)
			return false;

		this.scrollElement = document.id(this.options.scrollElement);
		this.originalPosition = this.element.getPosition();
		this.bound = {
			scroll: this.scroll.bind(this),
			resize: this.resize.bind(this)
		};
		this.stylePosition = this.element.getStyle('position');
		this.styleTop      = this.element.getStyle('top');
		this.styleLeft     = this.element.getStyle('left');
		this.styleRight    = this.element.getStyle('right');
		this.attachWindow();
		this.checkHeight();
	}
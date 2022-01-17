function TouchList( element ) {
		this.element = element;
		this.element.style.overflow = 'hidden';

		this.top = {
			value: 0,
			natural: 0
		};

		this.touch = {
			value: 0,
			offset: 0,
			start: 0,
			previous: 0
		};

		this.velocity = {
			value: 0,
			target: 0
		};
	}
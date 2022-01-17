function() {

		this.parent();

		this.contentWrapperElement = document.createElement('div');
		this.contentWrapperElement.addClass('view-content-wrapper');
		this.contentWrapperElement.wraps(this.contentElement);

		var classes = this.element.get('class');
		if (classes) {
			classes.split(' ').each(function(klass) {
				klass = klass.trim();
				if (klass) this.contentElement.addClass(klass + '-content');
			}, this);
		}
	}
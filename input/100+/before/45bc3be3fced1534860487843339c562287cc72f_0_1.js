function() {
		this.parent();
		var classes = this.element.get('class');
		if (classes) {
			classes.split(' ').each(function(klass) {
				klass = klass.trim();
				if (klass) this.contentElement.addClass(klass + '-content');
			}, this);
		}
	}
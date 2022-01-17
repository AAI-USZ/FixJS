function(contentElement) {

		if (this.contentElement === contentElement)
			return this;

		if (this.element.contains(contentElement) === false) {
			if (this.contentElement) {
				this.contentElement.grab(contentElement, 'after');
				this.contentElement.destroy();
			} else {
				this.contentWrapperElement.grab(contentElement);
			}
		}

		this.contentElement = contentElement;
		this.contentElement.addClass('view-content');

		return this;
	}
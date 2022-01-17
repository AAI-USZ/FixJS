function(content) {

		if (this.contentElement === content)
			return this;

		if (this.element.contains(content) === false) {
			if (this.contentElement) {
				this.contentElement.grab(content, 'after');
				this.contentElement.destroy();
			} else {
				this.element.grab(content);
			}
		}

		this.contentElement = content;
		this.contentElement.addClass('view-content');

		return this;
	}
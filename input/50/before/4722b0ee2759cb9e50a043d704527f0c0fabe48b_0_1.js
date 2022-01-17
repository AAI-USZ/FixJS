function(content) {
		content.height(content.height());
		content.empty().css({'background': 'url(' + this.options.loader + ') no-repeat center center', 'min-height': 60});
	}
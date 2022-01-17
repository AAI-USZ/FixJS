function() {
			if(this.length > 1) {
				$.error('Method jQuery.freetrans.getBounds can only be called on single selectors!');
			}
			return _getBounds(this);
		}
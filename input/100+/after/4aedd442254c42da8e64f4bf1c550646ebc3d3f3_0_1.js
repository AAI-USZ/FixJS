function() {
		this.items = Array.prototype.slice.apply( this.element.children );

		// Cache the list height so we don't need to go back to the DOM so much
		this.listHeight = this.element.offsetHeight;

		this.top.natural = this.element.scrollTop;
		this.top.value = this.top.natural;

		// One loop to get the properties we need from the DOM
		for( var i = 0, len = this.items.length; i < len; i++ ) {
			var item = this.items[i];
			item._offsetHeight = item.offsetHeight;
			item._offsetTop = item.offsetTop;
			item._offsetBottom = item._offsetTop + item._offsetHeight;
			item._state = '';

			// Opacity is a MAJOR performance hit on mobile so we can't allow it
			item.style.opacity = 1;
		}

		// Force an update
		this.update( true );

		this.bind();
	}
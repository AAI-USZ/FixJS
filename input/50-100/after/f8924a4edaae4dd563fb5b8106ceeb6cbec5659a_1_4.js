function() {
			this._attachEvents();
			this.contentScroller.removeEvents('cancel');
			this.contentScroller.removeEvents('complete');
			this.fireEvent('scroll');
		}
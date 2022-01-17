function(element, time) {

		var onEnd = function() {
			this.fireEvent('scroll');
			this._attachScrollListener();
		}.bind(this);

		this._detachScrollListener();

		this.scroller.setOptions({duration: time || 0});
		this.scroller.toElement(element);
		this.scroller.addEvent('cancel:once', onEnd);
		this.scroller.addEvent('complete:once', onEnd);

		return this;
	}
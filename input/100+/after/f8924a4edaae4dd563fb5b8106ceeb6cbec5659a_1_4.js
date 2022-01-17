function(x, y, time) {

		x = x || 0;
		y = y || 0;

		var onStart = function() {
			this._detachEvents();
		}.bind(this);

		var onComplete = function() {
			this._attachEvents();
			this.contentScroller.removeEvents('cancel');
			this.contentScroller.removeEvents('complete');
			this.fireEvent('scroll');
		}.bind(this);

		this.contentScroller.cancel();

		this.contentScroller.setOptions({duration: time || 0});
		this.contentScroller.addEvent('start:once', onStart)
		this.contentScroller.addEvent('cancel:once', onComplete);
		this.contentScroller.addEvent('complete:once', onComplete);
		this.contentScroller.start(x, y);

		return this;
	}
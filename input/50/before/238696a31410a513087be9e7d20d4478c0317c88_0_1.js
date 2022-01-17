function (e) {
		var that = this;

		if (e.target != that.scroller) return;

		that._unbind('webkitTransitionEnd');
		
		that._startAni();
	}
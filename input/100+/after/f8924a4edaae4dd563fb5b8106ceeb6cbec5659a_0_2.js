function(pageX, pageY, time) {

		pageX = pageX || 0;
		pageY = pageY || 0;

		if (pageX < 0) pageX = 0;
		if (pageY < 0) pageY = 0;

		var frame = this.getSize();
		var total = this.getScrollSize();

		var xmax = total.x - frame.x;
		var ymax = total.y - frame.y;

		var x = (this.options.snapToPageSizeX || frame.x) * pageX;
		var y = (this.options.snapToPageSizeY || frame.y) * pageY;
		if (x > xmax) x = xmax;
		if (y > ymax) y = ymax;

		this.scrollTo(x, y, time);

		return this;
	}
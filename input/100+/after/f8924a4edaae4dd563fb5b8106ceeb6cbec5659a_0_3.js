function() {

		var frame = this.getSize();
		var pageSizeX = (this.options.snapToPageSizeX || frame.x);
		var pageSizeY = (this.options.snapToPageSizeY || frame.y);

		//
		// the current page is always the page closest to the top left corner
		// of the screen. For instance, if the current page is 2 and the page
		// is dragged one pixel to the left, the current page will be 1 and the
		// move percentage will be 99.9
		//

		var scroll = this.getScroll();
		var pageX = Math.floor(scroll.x / pageSizeX);
		var pageY = Math.floor(scroll.y / pageSizeY);
		var moveX = (scroll.x / pageSizeX - pageX) * 100;
		var moveY = (scroll.y / pageSizeY - pageY) * 100;

		var snapToPageAt = this.options.snapToPageAt;
		var snapToPageDelay = this.options.snapToPageDelay;
		if (moveX > snapToPageAt || this._activeTouchDuration < snapToPageDelay) pageX += 1;
		if (moveY > snapToPageAt || this._activeTouchDuration < snapToPageDelay) pageY += 1;
		if (this._activeTouchDirectionX === 'left' && this._activeTouchDuration < snapToPageDelay) pageX -= 1;
		if (this._activeTouchDirectionY === 'top'  && this._activeTouchDuration < snapToPageDelay) pageY -= 1;

		return this.scrollToPage(pageX, pageY, this.options.snapToPageDuration);
	}
function() {

		var scroll = this.getScroll();

		var frame = this.getSize();
		var pageSizeX = (this.options.snapToPageSizeX || frame.x);
		var pageSizeY = (this.options.snapToPageSizeY || frame.y);

		var pageX = Math.floor(scroll.x / pageSizeX);
		var pageY = Math.floor(scroll.y / pageSizeY);

		var diffPageX = (scroll.x / pageSizeX - pageX) * 100;
		var diffPageY = (scroll.y / pageSizeY - pageY) * 100;

		if (diffPageX > this.options.snapToPageAt || this._activeTouchDuration < this.options.snapToPageDelay) pageX += 1;
		if (diffPageY > this.options.snapToPageAt || this._activeTouchDuration < this.options.snapToPageDelay) pageY += 1;

		if (this._activeTouchDirectionX === 'left') pageX -= 1;
		if (this._activeTouchDirectionY === 'top') pageY -= 1;

		return this.scrollToPage(pageX, pageY, this.options.snapToPageDuration);
	}
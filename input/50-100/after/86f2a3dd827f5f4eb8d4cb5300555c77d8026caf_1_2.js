function initScroll(){
		this.currentCursor = 'move';
		this.canvas.style.cursor = this.cursors.move;
		this.scrollInterval = setInterval(autoScroll.bind(this),1);
	}
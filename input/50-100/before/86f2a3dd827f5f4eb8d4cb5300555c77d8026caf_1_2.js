function initScroll(){
		if(this.mouseDownPos.x < this.width/2){
			this.currentCursor = 'resizeL';
			this.canvas.style.cursor = this.cursors.resizeL;
		}else{
			this.currentCursor = 'resizeR';
			this.canvas.style.cursor = this.cursors.resizeR;
		}
		this.scrollInterval = setInterval(autoScroll.bind(this),1);
	}
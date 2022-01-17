function(pos) {
	if(this.move) {
		this.x = this.startingPos.x + pos.x - this.mouseDownPos.x;
		if(this.x < 0){ this.x = 0; }
		if(this.x + this.width > this.tl.view.width){
			this.x = this.tl.view.width - this.width;
		}
		this.tl.render();
	}else if(this.resize) {
		this.width = this.startingWidth + pos.x - this.mouseDownPos.x;
		if(this.width < this.tl.sliderHandleWidth * 2){
			this.width = this.tl.sliderHandleWidth * 2;
		}
		if(this.width > this.tl.view.width){
			this.width = this.tl.view.width;
		}
		this.updateLength();
		this.tl.render();
	}
}
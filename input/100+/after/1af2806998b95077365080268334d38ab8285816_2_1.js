function(pos) {
	var p, lim, tl = this.tl;
	if(this.move) {
		p = this.startingPos.x + pos.x - this.mouseDownPos.x;
		if(p < 0){ p = 0; }
		else{
			lim = tl.view.width - this.width;
			if(p > lim){ p = lim; }
		}
		this.x = p;
		tl.render();
	}else if(this.resize) {
		p = this.startingWidth + pos.x - this.mouseDownPos.x;
		lim = tl.sliderHandleWidth * 2;
		if(p < lim){ p = lim; }
		else{
			lim = tl.view.width;
			if(p > lim){ p = lim; }
		}
		this.width = p;
		this.updateLength();
		tl.render();
	}
}
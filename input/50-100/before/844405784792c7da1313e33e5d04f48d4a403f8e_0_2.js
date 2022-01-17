function autoSizeR(){
		var mx = this.mousePos.x,
			dx = mx - this.slider.endx;
		if(mx > this.slider.middle && dx){
			this.view.endTime += dx*this.view.zoom/10;
			this.render();
		}
	}
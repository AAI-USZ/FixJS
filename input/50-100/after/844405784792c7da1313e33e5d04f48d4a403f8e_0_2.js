function autoSizeR(){
		var mx = this.mousePos.x,
			dx = mx - this.slider.endx;
		if(dx){
			this.view.endTime += dx*this.view.zoom/10;
			this.render();
		}
	}
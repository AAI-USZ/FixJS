function autoSizeL(){
		var mx = this.mousePos.x,
			dx = mx - this.slider.startx;
		if(dx){
			this.view.startTime += dx*this.view.zoom/10;
			this.render();
		}
	}
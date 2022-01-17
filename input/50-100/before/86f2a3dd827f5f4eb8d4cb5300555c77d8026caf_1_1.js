function autoScroll(){
		var delta = this.mousePos.x/this.width-.5;
		if((this.mouseDownPos.x>this.width/2)?delta > 0:delta < 0){
			this.view.move(10*(delta)*this.view.zoom);
			this.render();
		}
	}
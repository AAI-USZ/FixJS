function autoScroll(){
		var delta = this.mousePos.x/this.width-.5;
		if(delta){
			this.view.move(10*(delta)*this.view.zoom);
			this.render();
		}
	}
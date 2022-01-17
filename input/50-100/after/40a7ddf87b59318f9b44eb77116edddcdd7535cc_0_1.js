function(){
		// summary:
		//		Toggle this pane's visibility
		if(this._showing){
			this._hideWrapper();
			this._showAnim && this._showAnim.stop();
			this._hideAnim.play();
		}else{
			this._hideAnim && this._hideAnim.stop();
			this._showAnim.play();
		}
		this._showing = !this._showing;
		this.domNode.setAttribute("aria-expanded", this._showing);
	}
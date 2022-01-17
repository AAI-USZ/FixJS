function(){
	if(this.ctx){
		// Will fail if the browser thinks the image was cross-domain
		try {
			this.clipboard = this.ctx.getImageData(0, 0, this.width, this.height);
			this.clipboardData = this.clipboard.data;
		}catch(e){};
	}
	return this;
}
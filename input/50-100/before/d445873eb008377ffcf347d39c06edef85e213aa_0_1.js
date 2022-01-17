function(type){
	if(console && typeof console.log=="function") console.log('draw',this.canvas)
	if(!this.ctx) return this;

	return this.update();
}
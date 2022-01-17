function(type){
	if(console && typeof console.log=="function") console.log('draw',this.canvas)
	if(!this.ctx) return this;

	this.ctx.clearRect(0,0,this.width,this.height);

//	this.ctx.drawImage(this.img,0,0,this.width,this.height);
	return this;
}
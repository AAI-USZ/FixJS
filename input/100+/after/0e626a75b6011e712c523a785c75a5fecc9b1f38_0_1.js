function item(selector,startTime,endTime,animations,pause,resume){
	this.selector = selector;
	this.container = this.selector.parents().eq(0);
	this.originalHeight = parseInt(selector.css('height').replace('px',''));
	this.originalWidth  = parseInt(selector.css('width').replace('px',''));
	this.currentBottom  = parseInt(selector.css('bottom').replace('px',''));
	this.currentLeft		= parseInt(selector.css('left').replace('px',''));
	this.adjustedHeight = this.originalHeight * windowScale;
	this.adjustedWidth  = this.originalWidth * windowScale;
	this.adjustedLeft   = this.currentLeft * windowScale;
	this.startTime      = startTime;
	this.endTime				= endTime;
	this.pause					= pause;
	this.resume					= resume;
	this.animations     = animations;
	this.count					= 0;
	// console.log(this.currentLeft);
	this.selector.css({'height':this.adjustedHeight,'width':this.adjustedWidth});
}
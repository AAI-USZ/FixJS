function(generate, canvas){
	this.canvas = $('#' + canvas).get(0);
	this.context = this.canvas.getContext('2d');
	this.points = [];
	this.currentX = 0;
	this.generate = generate;
	this.debugY = 0;
}
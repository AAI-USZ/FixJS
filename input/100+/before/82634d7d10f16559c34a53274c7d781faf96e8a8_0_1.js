function(x, y, radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.frameCount = -1;
	this.pulseFrameCount = 0;
	this.frameBuffer = [];
	this.collided = [];
	this.waveForm = null;
	this.newWave = false;
	this.nextPulse = null;
	this.click = document.createElement('audio');
	this.click.setAttribute('src', '../Audio/click.wav');
	this.click.setAttribute('type', 'audio/wav');
	$('#mainDIV').append(this.click);
	// this.click = new Audio('../Audio/click.mp3');
}
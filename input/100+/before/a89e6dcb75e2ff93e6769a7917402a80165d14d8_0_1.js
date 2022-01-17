function draw() {
	var frame = frame_ / (.5 * Math.PI);
	frame /= 10;

	context.globalAlpha = 1;
	// background circle
	context.beginPath();
	context.arc(centerX, centerY, radius + .2, 0, 2 * Math.PI, false);
	context.fillStyle = "#1C800F";
	context.fill();
	
	// inner radars
	for (var i=1; i<=4; i++) {
		context.beginPath();
		context.arc(centerX, centerY, i*radius/4 + 1.5, 0, 2 * Math.PI, false);
		context.lineWidth = 2;
		context.strokeStyle = "#52FF00";
		context.stroke();
	}
	// main bar
	context.globalAlpha = 0.64;
	for (var i=25; i>0; i--) {
		context.beginPath();
		context.arc(centerX, centerY, radius, frame + (.2*i)/16, 
				frame + (.2*(i))/15, false);
		context.lineTo(centerX, centerY);
		var rgb = "rgb(" + Math.round(rS + rD*i/15) + ',' +
				Math.round(gS + gD*i/15) + ',' + 
				Math.round(bS + bD*i/15) + ')';
		context.fillStyle = rgb;
		context.fill();
	}
}
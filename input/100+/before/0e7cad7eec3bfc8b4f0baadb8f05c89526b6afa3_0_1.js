function draw() {
	var cWidth = canvas.width;
	var cHeight = canvas.height;
	context.clearRect(0,0,cWidth,cHeight);
	var frame = frame_ / speed;
	frame %= 2 * Math.PI;

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
		context.arc(centerX, centerY, radius + 3, frame + (.2*i)/16, 
				frame + (.2*(i))/15, false);
		context.lineTo(centerX, centerY);
		var rgb = "rgb(" + Math.round(rS + rD*i/15) + ',' +
				Math.round(gS + gD*i/15) + ',' + 
				Math.round(bS + bD*i/15) + ')';
		context.fillStyle = rgb;
		context.fill();
	}
	// high quality blip action
	for (var i=0; i<numActive; i++) {
		var blip = blips[i];
		blip.container.style.opacity = Math.max(0, blipAlpha * blip.t / blipDuration);
		if (--blip.t < 0 && --blip.cooldown < 0) {
			blip.t = blipDuration;
			
			if (--blip.lives <= 0) {
				blip = getBlip(frame, null, blip);
			}
			blips[i] = blip;
		}
		
		if (greenBlips) {
			context.globalAlpha = Math.max(0, blipAlpha * blip.t / blipDuration);
			context.beginPath();
			context.rect(centerX + blip.x - blipX/2, 
					centerY + blip.y - blipY/2, blipX, blipY);
			context.fillStyle = '#6AC934';
			context.fill();
		}
	}
}
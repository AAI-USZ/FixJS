function() {
		if(debug || angledebug)
			console.log("Updating Tank...");

		//this.updateAngle();
		this.calcMinDiff();

		if(angledebug)
			console.log("banlge: " + bangle + " rotSpeed: " + rotSpeed + " deltaY: " + deltaY);
		if(newAngle > bangle)
			rotSpeed += (deltaY+1) * ((deltaX == 0) ? Math.PI/60 : Math.PI/60/Math.abs(deltaX));
		else
			rotSpeed -= (deltaY+1) * ((deltaX == 0) ? Math.PI/60 : Math.PI/60/Math.abs(deltaX));
			
		if((bangle == 0 && Math.abs(newAngle) < .01) || Math.abs(newAngle - bangle) < .01 || (bangle != 0 && Math.abs((newAngle - bangle)/bangle) < .01))
		{
			if(angledebug)
				console.log("no change");
			rotSpeed = 0;
			bangle = normalize(newAngle);
		}
		else if(newAngle > bangle && rotSpeed >= 0 && (bangle + rotSpeed) >= newAngle
			|| newAngle < bangle && rotSpeed <= 0 && (bangle + rotSpeed) <= newAngle)
		{
			if(angledebug)
				console.log("done turning");
			rotSpeed = 0;
			bangle = normalize(newAngle);
			drawbangle = bangle;
		}
		else
		{
			if(angledebug)
				console.log("rotating");
			bangle = normalize(bangle + rotSpeed);
			drawbangle = bangle;
		}
		
		if(debug)
			console.log("this.y: " + this.y);
		
		var treadBottom = (height/2+treHeight/2)/Math.cos(bangle);
		var bottomOffset = ((this.x - minUnder)*Math.tan(bangle));
		this.y = Math.round(bg.height[minUnder] - bottomOffset - treadBottom);
		
		if(debug)
			console.log("this.y: " + this.y + " treadBottom: " + treadBottom + " bottomOffset: " + bottomOffset + " this.x: " + this.x + " minUnder: " + minUnder + " bangle: " + bangle + " tan(bangle): " + Math.tan(bangle));
		
		if(angledebug || debug)
			console.log("bangle in UT: " + bangle);
		
		this.updateRotOffsets();
		if(angledebug || debug)
			console.log("Done updating Tank");
	}
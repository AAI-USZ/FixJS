function Ball(X,Y,imgSrc) {
	var dX = 0; // Movement in x or y direction
	var dY = 0;
	var speed = 0; // Speed for moving towards a target in pixels / sec

	var targetX = X; // Coords of target
	var targetY = Y;
	var hasTarget = false;

	this.id;
	this.imgSrc = imgSrc;

	this.getPosition = function() {
		//return hasTarget;
		return "(" + X + "," + Y + ")";
	}

	this.setDirection = function(dx,dy) {
		// Normalize direction vector
		var length = Math.sqrt(dx*dx + dy*dy);
		dX = dx / length;
		dY = dy / length;
		hasTarget = false;
	}

	this.setSpeed = function(s) {
		speed = s;
	}

	this.getTarget = function() {
		return "(" + targetX + "," + targetY + ")";
	}

	this.setTarget = function(x,y) {
		targetX = x;
		targetY = y;
		hasTarget = true;
	}

	this.update = function(time) {
		var dom = document.getElementById(this.id);
		var elapsedTime = time.getElapsedTime() / 1000; // elapsed time in seconds
		var distance = speed * elapsedTime;
		var dx = 0,dy = 0;

		if (hasTarget) {
			dx = targetX - X;
			dy = targetY - Y;
			var length = Math.sqrt(dx*dx + dy*dy);
			// Normalize direction vector
			if (length > distance) {
				// adept movements to have the right speed
				dx *= distance / length;
				dy *= distance / length;
			}
		}
		else {
			if ((X + dom.clientWidth/2) >= iPortraitWidth)
				dX = -Math.abs(dX);
			if ((X - dom.clientWidth/2) <= 0)
				dX = Math.abs(dX);
			if ((Y + dom.clientHeight/2) >= iLandscapeWidth) 
				dY = -Math.abs(dY);
			if ((Y - dom.clientHeight/2) <= 0)
				dY = Math.abs(dY);
			dx = dX * distance;
			dy = dY * distance;
		}

		X += dx;
		Y += dy;

		// Update the actual dom properties
		dom.style.top = (Math.round(Y) - dom.clientHeight/2) + 'px';
		dom.style.left = (Math.round(X) - dom.clientWidth/2) + 'px';
	}

	// Add this ball to DOM
	this.show = function() {
		var wrapper = document.getElementById("balls");
		var balls = wrapper.getElementsByTagName("img");

		// create a unique id for the img element
		if (balls.length == 0)
			var ballNr = 1;
		else
			var ballNr = parseInt(balls[balls.length-1].id.substr(4)) + 1;
		this.id = "ball" + ballNr;

		var html = '<img id="' + this.id + '" src="' + this.imgSrc + '" style="position:absolute;" />';
		wrapper.innerHTML += html;
	}
	
	// Remove ball from DOM
	this.hide = function() {
		var wrapper = document.getElementById("balls");
		var dom = document.getElementById(this.id);
		wrapper.removeChild(dom);
	}
}
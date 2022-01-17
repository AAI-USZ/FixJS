function Ball(x,y,imgSrc) {
	var X = x; // Current x and y coords
	var Y = y; 
	var dX = 0; // Movement per frame in x or y direction
	var dY = 0;
	var targetX = 0; // Coords of target
	var targetY = 0;
	var speed = 0; // Speed for moving towards a target
	var hasTarget = false;

	this.id;
	this.dom;
	this.imgSrc = imgSrc;

	Ball.prototype.getTarget = function() {
		return "(" + targetX + "," + targetY + ")";
	}

	Ball.prototype.getPos = function() {
		return "(" + X + "," + Y + ")";
	}

	Ball.prototype.setDirection = function(dx,dy) {
		dX = dx;
		dY = dy;
	}

	Ball.prototype.setSpeed = function(s) {
		speed = s;
	}

	Ball.prototype.setTarget = function(x,y) {
		hasTarget = true;
		targetX = x;
		targetY = y;
	}

	Ball.prototype.update = function(time) {
		if (hasTarget) {
			dX = targetX - X;
			dY = targetY - Y;
		}

		// Scale (dX,dY) to have the right speed
		if (!(dX == 0 && dY == 0)) {
			// make the movements independent of the framerate
			var elapsed = time.getElapsedTime() / 1000; // elapsed time in seconds
			var scalar = (speed * elapsed) / Math.sqrt(dX*dX + dY*dY);
			if (hasTarget && scalar < 1) {
				dX *= scalar;
				dY *= scalar;
			}
		}

		if (!hasTarget) {
			if ((X + this.imageWidth) >= iPortraitWidth 
					|| (X - this.imageWidth) <= 0)
				dX = -dX;
			if ((Y + this.imageHeight) >= iLandscapeWidth 
					|| (Y - this.imageHeight) <= 0)
				dY = -dY;
		}

		X += dX;
		Y += dY;

		// Update the actual dom properties
		this.dom.style.top = (Math.round(Y) - this.dom.clientHeight/2) + 'px';
		this.dom.style.left = (Math.round(X) - this.dom.clientWidth/2) + 'px';
	}

	// Add this ball to DOM
	Ball.prototype.show = function() {
		var wrapper = document.getElementById("balls");
		var balls = wrapper.getElementsByTagName("img");

		// create a unique id for the img element
		if (balls.length == 0)
			var ballNr = 1;
		else
			var ballNr = parseInt(balls[balls.length-1].id.substr(4)) + 1;
		this.id = "ball" + ballNr;

		var html = '<img id="' + this.id + '" src="' + this.imgSrc + '" style="position:absolute; top:' + Y + 'px; left:' + X + 'px;"/>';
		wrapper.innerHTML += html;
		this.dom = wrapper.childNodes[this.id];
	}
	
	// Rmove ball from DOM
	Ball.prototype.hide = function() {
		var wrapper = document.getElementById("balls");
		var dom = wrapper.childNodes[this.id];
		wrapper.removeChild(dom);
	}
}
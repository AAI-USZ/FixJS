function() {
		var bottomRange = firstX;
		var topRange = (radius6*Math.cos(bangle - Math.PI/2 + ang7)) + this.x;		
		
		this.calcMinDiff();
		
		if(debug)
			console.log("minDiff: " + minDiff + " minDiffX: " + minDiffX);
		
		//if(minDiff > treHeight + height/2)
		if(debug)
			console.log(bg.height[minUnder] + " " + bottomPos[minUnder - firstX]);
		if(minDiff > 1)
		{
			return -1;
		}
		else
		{
		/*
			var treadBottom = (height/2+treHeight/2)/Math.cos(bangle);
			var bottomOffset = ((this.x - minDiffX)*Math.tan(bangle));
			if(debug)
				console.log("Movement success -- old y: " + this.y);
			console.log(2);
			this.y = Math.round(bg.height[minDiffX] - bottomOffset - treadBottom);// + ((deltaY / (treHeight/3)) % (treHeight/3)));
			if(debug)
				console.log("new y: " + this.y);		*/
			deltaY = 0;
		}
	
		if(debug)
			console.log("Bump Check");
		if(deltaX > 0)
		{
			var treadBottom = (height/2+treHeight/2)/Math.cos(bangle);
			var bottomOffset = (((radius6*Math.cos(bangle - Math.PI/2 + ang7)) + 1)*Math.tan(normalize(bangle + ((bangle >= 0) ? .175 : 0.35))));
			if(debug)
			{
				console.log(bg.height.length + " " + (this.x + rotOffsets[30] + 1));
			}
			if(Math.max(this.x+1,this.x + (radius6*Math.cos(bangle - Math.PI/2 + ang7)) + 1) >= bg.height.length)
				return -2;
			if(bangle >=  0 && bg.height[Math.ceil((radius6*Math.cos(bangle - Math.PI/2 + ang7)) + this.x + 1)] < Math.round(this.y + treadBottom - bottomOffset))
				return -2;
		}
		else if(deltaX < 0)
		{
			var treadBottom = (height/2+treHeight/2)/Math.cos(bangle);
			var bottomOffset = (((radius6*Math.cos(bangle - Math.PI/2 - ang7)) - 1)*Math.tan(normalize(bangle + ((bangle >= 0) ? -.35 : -0.175))));
			/*
			if(bangle >=0)
				var bottomOffset = (((radius6*Math.cos(bangle - Math.PI/2 - ang7)) - 1)*Math.tan(normalize(bangle +  -0.35)));
			else				
				var bottomOffset = (((radius6*Math.cos(bangle - Math.PI/2 - ang7)) - 1)*Math.tan(normalize(bangle + -0.175)));
				*/
			if(debug)
				console.log(bg.height.length + " " + (this.x + (radius6*Math.cos(bangle - Math.PI/2 - ang7)) - 1));
			if(Math.min(this.x-1,this.x + (radius6*Math.cos(bangle - Math.PI/2 - ang7)) - 1) < 0)
				return -2;
			if(bg.height[Math.floor((radius6*Math.cos(bangle - Math.PI/2 - ang7)) + this.x - 1)] < Math.round(this.y + treadBottom - bottomOffset))
				return -2;
		}
		
		return 1;	
	}
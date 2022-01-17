function tank() { 	
	var radius1, radius2, radius3, radius4, radius5, radius6, radius7;
	var ang1, ang2, ang3, ang4, ang5, ang6, ang7, ang8;
	
	var height = 6, width = 25; //height and width of the body
	var treHeight = Math.round(6/10*height), turcp = Math.round(6/4*height); //height of the turret, and positions of the control points for the curved ends.
	var turLen = (6/10)*width;
	var turWidth = Math.max(height/5,2);

	var drawbangle; //Angle we'll draw the tank at
	var bangle;  //Angle of the tank's body. Positive tilts the left side down, negative tilts the right side down
	var rotSpeed;	//The speed that the tank is rotating
	var	newAngle;	//The angle that the tank is rotating towards
	var	minUnder;	//The x-coord where bg has the minimum value under the tank (i.e. the highest point on the map segment)
	var underLength;	//The length of the segment of the map that newAngle is based on
	var deltaY;			//The change in y position
	var deltaX;			//The change in x position
	var rotOffsets = new Array(38);		//The deltas for all of the various points on the tank. Note that because the y positions decrease going up, those offsets must be subtracted
	var hasSlid = false; //Not really sure, I don't think it matters
	var slideDist;		//Same
	var bottomPos = new Array(width + 1);	//The y-positions along the bottom of the tank. The position with val -1 bounds the meaningful values.
	var firstX;			//The first x-position under the tank
	var gdiff;		//The difference between the gun's angle and the body's angle
	this.gangle;		//The gun's angle
	this.shotCoords = new Array(2);	//The x,y coords where bullets originate;
	var minDiff = 9999;	//The minimum difference between the tank and the ground
	var minDiffX = -1;	//That difference's x value
		
	var willdraw = true;	//debugging
	var debug = false;		//debugging
	var angledebug = false;	//debugging
	var mark = 0;
	
	
	normalize = function(alpha) {
		while(alpha < -1*Math.PI)
			alpha += (2*Math.PI);
		while(alpha > Math.PI)
			alpha -= (2*Math.PI);
			
		if(alpha > 7/16*Math.PI)
			alpha = 7/16*Math.PI;
		else if(alpha < -7/16*Math.PI)
			alpha = -7/16*Math.PI;
			
		return alpha;
	}
	
	this.drawTurret = function() {
		this.gangle = drawbangle + gdiff;
		this.shotCoords[0] = this.x + turLen*Math.cos(this.gangle);
		this.shotCoords[1] = this.y - height/2 - turLen*Math.sin(this.gangle);
		var xOff0 = 0;														var yOff0 = height/2;
		var xOff1 = xOff0 + turWidth/2*Math.cos(this.gangle - Math.PI/2);	var yOff1 = yOff0 + turWidth/2*Math.sin(this.gangle - Math.PI/2);
		var xOff2 = xOff1 + turLen*Math.cos(this.gangle);					var yOff2 = yOff1 + turLen*Math.sin(this.gangle);
		var xOff3 = xOff2 + turWidth*Math.cos(this.gangle+Math.PI/2);		var yOff3 = yOff2 + turWidth*Math.sin(this.gangle + Math.PI/2);
		var xOff4 = xOff3 - turLen*Math.cos(this.gangle);					var yOff4 = yOff3 - turLen*Math.sin(this.gangle);
		ctx.beginPath();
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.moveTo(this.x + xOff0 ,this.y - yOff0);
		ctx.lineTo(this.x + xOff1 ,this.y - yOff1);
		ctx.lineTo(this.x + xOff2 ,this.y - yOff2);
		ctx.lineTo(this.x + xOff3 ,this.y - yOff3);
		ctx.lineTo(this.x + xOff4 ,this.y - yOff4);
		ctx.closePath();
		ctx.fill();
	}
	
	this.draw = function() {
		//body
		this.drawTurret();
		ctx.beginPath();
		ctx.fillStyle = "rgb(21,98,19)";	
		
		ctx.moveTo(this.x + rotOffsets[0],this.y -rotOffsets[1]);
		ctx.lineTo(this.x + rotOffsets[2],this.y - rotOffsets[3]);
		ctx.lineTo(this.x + rotOffsets[4],this.y - rotOffsets[5]);
		ctx.quadraticCurveTo(this.x + rotOffsets[6],this.y - rotOffsets[7],
				this.x + rotOffsets[8],this.y - rotOffsets[9]);
		ctx.lineTo(this.x + rotOffsets[10],this.y - rotOffsets[11]);
		ctx.bezierCurveTo(this.x + rotOffsets[12],this.y - rotOffsets[13],
						this.x + rotOffsets[14],this.y - rotOffsets[15],
						this.x + rotOffsets[16],this.y - rotOffsets[17]);
		ctx.lineTo(this.x + rotOffsets[18],this.y - rotOffsets[19]);
		ctx.quadraticCurveTo(this.x + rotOffsets[20],this.y - rotOffsets[21],
				this.x + rotOffsets[22],this.y - rotOffsets[23]);
		ctx.closePath();
		ctx.fill();
		//Treads
		ctx.beginPath();
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.moveTo(this.x + rotOffsets[24],this.y - rotOffsets[25]);
		ctx.lineTo(this.x + rotOffsets[26],this.y - rotOffsets[27]);
		//ctx.quadraticCurveTo(this.x + rotOffsets[28],this.y - rotOffsets[29],
			ctx.lineTo(this.x + rotOffsets[30],this.y - rotOffsets[31]);
		ctx.lineTo(this.x + rotOffsets[32],this.y -rotOffsets[33]);
		//ctx.quadraticCurveTo(this.x + rotOffsets[34],this.y - rotOffsets[35],
			ctx.lineTo(this.x + rotOffsets[36],this.y - rotOffsets[37]);
		ctx.closePath();
		ctx.fill();
		if(mark == 1)
		{
			ctx.beginPath();
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.moveTo(this.x,this.y);
			ctx.arc(this.x, this.y, 1, 0, 2*Math.PI, true);
			ctx.closePath();
			ctx.fill();
		}
		else if(mark == 2)
		{
			ctx.beginPath();
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.moveTo(this.x-15,this.y);
			ctx.lineTo(this.x+15, this.y);
			ctx.moveTo(this.x,this.y-15);
			ctx.lineTo(this.x,this.y+15);
			ctx.stroke();
		}
	}
	
	this.updateRotOffsets = function() {
		rotOffsets[0] = Math.floor(radius1*Math.cos(drawbangle + 3*ang1 + ang2));
		rotOffsets[1] = Math.floor(radius1*Math.sin(drawbangle + 3*ang1 + ang2));
		rotOffsets[2] = Math.floor(radius1*Math.cos(drawbangle - ang1));
		rotOffsets[3] = Math.floor(radius1*Math.sin(drawbangle - ang1));
		rotOffsets[4] = (radius2*Math.cos(drawbangle + ang3));
		rotOffsets[5] = (radius2*Math.sin(drawbangle + ang3));
		rotOffsets[6] = (radius1*Math.cos(drawbangle + ang1));
		rotOffsets[7] = (radius1*Math.sin(drawbangle + ang1));
		rotOffsets[8] = (radius3*Math.cos(drawbangle + ang4));
		rotOffsets[9] = (radius3*Math.sin(drawbangle + ang4));
		rotOffsets[10] = (radius4*Math.cos(drawbangle + ang5));
		rotOffsets[11] = (radius4*Math.sin(drawbangle + ang5));
		rotOffsets[12] = (radius5*Math.cos(drawbangle + Math.PI/2 - ang6));
		rotOffsets[13] = (radius5*Math.sin(drawbangle + Math.PI/2 - ang6));
		rotOffsets[14] = (radius5*Math.cos(drawbangle + Math.PI/2 + ang6));
		rotOffsets[15] = (radius5*Math.sin(drawbangle + Math.PI/2 + ang6));
		rotOffsets[16] = (radius4*Math.cos(drawbangle + Math.PI - ang5));
		rotOffsets[17] = (radius4*Math.sin(drawbangle + Math.PI - ang5));
		rotOffsets[18] = (radius3*Math.cos(drawbangle + Math.PI - ang4));
		rotOffsets[19] = (radius3*Math.sin(drawbangle + Math.PI - ang4));
		rotOffsets[20] = (radius1*Math.cos(drawbangle + Math.PI - ang1));
		rotOffsets[21] = (radius1*Math.sin(drawbangle + Math.PI - ang1));
		rotOffsets[22] = (radius2*Math.cos(drawbangle + Math.PI - ang3));
		rotOffsets[23] = (radius2*Math.sin(drawbangle + Math.PI - ang3));		
		rotOffsets[24] = Math.floor(radius1*Math.cos(drawbangle + 3*ang1 + ang2));
		rotOffsets[25] = Math.floor(radius1*Math.sin(drawbangle + 3*ang1 + ang2));
		rotOffsets[26] = Math.floor(radius1*Math.cos(drawbangle - ang1));
		rotOffsets[27] = Math.floor(radius1*Math.sin(drawbangle - ang1));
		rotOffsets[28] = (radius7*Math.cos(drawbangle - ang8));
		rotOffsets[29] = (radius7*Math.sin(drawbangle - ang8));
		rotOffsets[30] = (radius6*Math.cos(drawbangle - Math.PI/2 + ang7));
		rotOffsets[31] = (radius6*Math.sin(drawbangle - Math.PI/2 + ang7));
		rotOffsets[32] = (radius6*Math.cos(drawbangle - Math.PI/2 - ang7));
		rotOffsets[33] = (radius6*Math.sin(drawbangle - Math.PI/2 - ang7));
		rotOffsets[34] = (radius7*Math.cos(drawbangle + Math.PI + ang8));
		rotOffsets[35] = (radius7*Math.sin(drawbangle + Math.PI + ang8));
		rotOffsets[36] = Math.floor(radius1*Math.cos(drawbangle + 3*ang1 + ang2));
		rotOffsets[37] = Math.floor(radius1*Math.sin(drawbangle + 3*ang1 + ang2));
	}
	
	this.updateBottom = function() {
		firstX = Math.round((radius6*Math.cos(bangle - Math.PI/2 - ang7)) + this.x);
		var lastX = (radius6*Math.cos(bangle - Math.PI/2 + ang7)) + this.x;
		var bottomDelta =  Math.tan(bangle);
		var bottomY = this.y - (radius6*Math.sin(bangle - Math.PI/2 - ang7));
		
		var bIndex;
		for(bIndex = firstX; bIndex <= lastX; bIndex++)
		{
			bottomPos[bIndex - firstX] = bottomY;
			bottomY -= bottomDelta;
		}
		bottomPos[bIndex - firstX] = -1;
	}

	this.calcMinDiff = function() {
		var bottomDelta =  Math.tan(bangle);
		var searchY = this.y - (radius6*Math.sin(bangle - Math.PI/2 - ang7));
		var bottomRange = Math.round((radius6*Math.cos(bangle - Math.PI/2 - ang7))) + this.x;
		var topRange = (radius6*Math.cos(bangle - Math.PI/2 + ang7)) + this.x;	
		
		minDiff = 9999;
		minDiffX = -1;
		
		if(debug)
		{
			console.log("this.y: " + this.y + " rotOffsets[33]: " + rotOffsets[33]);
			console.log("searchY: " + searchY + " bottomDelta: " + bottomDelta);
			console.log("bangle: " + bangle);
		}
		
		var upLimit = (treHeight + height/2)*Math.cos(bangle);
		for(diffSearch=bottomRange;diffSearch<=topRange;diffSearch++, searchY -= bottomDelta)
		{		
			if(bg.height[diffSearch] < (searchY - upLimit))
			{
				if(debug)
				{
					console.log(diffSearch + " " + bg.height[diffSearch] + " " + (searchY-upLimit));
					//console.log("skip");
				}
			//	continue;
			}
			
			var diff = bg.height[diffSearch] - searchY;
			if(diff < minDiff)
			{
				minDiff = diff;
				minDiffX = diffSearch;
			}
		}
	}
	
	this.updatePosition = function() {
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
	
	this.update = function() {
		if(!willdraw)
			return;
		if(angledebug || debug)
			console.log("this.drawing...\n(x,y) = (" + this.x + "," + this.y + ")");
		
		var minDiff = 9999;
		var minDiffX = -1;
		
		var dxAtStart = deltaX;
		if(debug)
			console.log("dxAtStart: " + dxAtStart);
		stepsAtStart = Math.abs(dxAtStart);
		stepsRemaining = stepsAtStart;
		var falling = 0;
		while(stepsRemaining > 0)
		{
			moveType = this.tryMove();
			if(moveType == -1) //falling
			{
				this.fall();
				this.draw();
				return;
			}
			else if(moveType == -2) //obstacle
			{
				this.updateAngle();
				this.updatePosition();
				this.updateRotOffsets();
				this.draw();
				return;
			}
			else if(moveType == -3) //sliding down wall
			{
			}
			
			if(angledebug)
				console.log("bangle: " + bangle);
			if(debug)
				console.log("stepsRemaining: " + stepsRemaining);

			if(deltaX > 0)
			{
				this.x++;
				stepsRemaining -= Math.sqrt(1 + Math.pow((bg.height[this.x] - bg.height[this.x-1]),2));
			}
			else
			{
				this.x--;
				stepsRemaining -= Math.sqrt(1 + Math.pow((bg.height[this.x] - bg.height[this.x+1]),2));
			}
			
			this.updateAngle();
			this.slide();
			this.updatePosition();
		}
		
		if(dxAtStart == 0)
		{
			if(this.tryMove() == -1)
				this.fall();
			else
			{
				this.updateAngle();
				this.slide();
				this.updatePosition();
			}
		}
		
		this.updateRotOffsets();
		this.draw();
	}
	
	this.fall = function() {
		if(debug)
		{
			console.log("falling");
			console.log("delta Y: " + deltaY + " minDiff: " + minDiff);
		}
		
		if(deltaY < height*3)
		{
			deltaY += Math.max(Math.round(height/5),1);
			rotSpeed += (Math.PI/3)/(3*height)
		}
			
		if(deltaY < minDiff)
		{
			newAngle = bangle;
			this.y += deltaY;
		}
		else
		{
			this.updateBottom();
			if(this.x > minDiffX)
			{
				rotSpeed = -1 * rotSpeed;
			}
			else if(this.x < minDiffX || bangle >= 0)
				rotSpeed = rotSpeed;
			else
				rotSpeed = -1 * rotSpeed;
			if(debug)
			{
				console.log(minUnder - firstX);
				console.log(minUnder + " " + bg.height[minUnder] + " " + (bottomPos[minUnder - firstX] + deltaY));
			}
			if(bg.height[minUnder] < bottomPos[minUnder - firstX] + deltaY)
			{
				if(debug)
					console.log("minUnder fell and hit");
				this.updateAngle();
				this.updatePosition();
			}
			else
			{
				if(debug)
					console.log("did not hit minUnder");	
				this.updateAngle();
				bangle = normalize(bangle + rotSpeed);
				drawbangle = bangle;
				
				var treadBottom = (height/2+treHeight/2)/Math.cos(bangle);
				var bottomOffset = ((this.x - minDiffX)*Math.tan(bangle));
				this.y = Math.round(bg.height[minDiffX] - bottomOffset - treadBottom);
			}
			deltaY = 0;
		}
	}
		
	this.slide = function() {
		slideDist = Math.max(this.slideDist,Math.max(Math.round(width/10),1));
			
		return false;
		if(underLength < 0)
		{
			if(-1*width/6 < underLength && underLength < 0)
			{
				if(debug)
					console.log("this.slide right: " + underLength);
				this.x += slideDist;
				hasSlid = true;
				return true;
			}
			
			if(bangle > 7*Math.PI/16)
			{
				if(debug)
					console.log("Tilt this.slide right " + bangle);
				//this.x += slideDist;
				return true;
			}
			
		}
		else
		{	if(0 <= underLength && underLength < width/6)
			{
				if(debug)
					console.log("this.slide left: " + underLength);
				this.x -= slideDist;
				hasSlid = true;
				return true;
			}
			
			if(bangle < -7*Math.PI/16)
			{
				if(debug)
					console.log("Tilt this.slide left " + bangle);
				//this.x -= slideDist;
				return true;
			}
		}
		
		this.slideDist = 0;
		return false;
	}
	
	this.updateAngle = function() {
		var searchAngle = bangle;
		var accumulator = 0;
		var counter = 0;
		
		do
		{
			//find the minimum ground coordinate (highest ground) under the tank
			var min = -1;
			var min_height = 10000;
			var bottomRange = Math.round((radius6*Math.cos(searchAngle - Math.PI/2 - ang7)) + this.x);
			var topRange = (radius6*Math.cos(searchAngle - Math.PI/2 + ang7)) + this.x;
			
			for(minSearch=Math.round(bottomRange);minSearch<=topRange;minSearch++)
			{	
				//TODO: ignore ones that are way too high
				if(bg.height[minSearch] <= min_height)
				{
					if(bg.height[minSearch] < min_height ||  (Math.abs(minSearch - this.x) <= Math.abs(min - this.x)))
					{
						min = minSearch;
						min_height = bg.height[min];
					}
				}
			}
			minUnder = min;


			//TODO deal with rotational speed
			if(min > this.x || (this.x == min && searchAngle > 0))
			{
				var searchMin = Math.min(this.x,bottomRange);
				var loopCond = Math.max(this.x,bottomRange);
				var edgeRight = -1, edgeLeft = min;
				do
				{
					var tempLE, tempLET = 10000;
					for(posx = edgeLeft-1;posx >= searchMin; posx--)
					{
						posT = Math.atan((bg.height[posx] - bg.height[min])/(min - posx));
						if(posT < tempLET)
						{
							tempLE = posx;
							tempLET = posT;
						}
					}
					
					var estLE = tempLE, estLET = tempLET;

					for(posx = tempLE-1;posx >= searchMin; posx--)
					{
						var slope = (bg.height[min] - bg.height[posx])/(min - posx);
						//Try stepping further out, change bounds
						var hDist = min - tempLE;
						var diff = (bg.height[min] + (hDist * slope)) - bg.height[tempLE];
						if(diff < height/6)
						{	
							estLE = posx;
							estLET = Math.atan(slope);
						}
					}
					edgeRight = edgeLeft;
					edgeLeft = estLE;
					underLength = edgeRight - edgeLeft;
				} while(edgeLeft > loopCond)
			}
			else if(min < this.x || (this.x == min && searchAngle < 0))
			{
				var searchMax = Math.max(this.x,topRange);
				var loopCond = Math.min(this.x,topRange);
				var edgeRight = min, edgeLeft = -1;
				do
				{
					var tempRE, tempRET = 10000;
					for(posx = edgeRight+1;posx <= searchMax; posx++)
					{
						posT = Math.atan((bg.height[posx] - bg.height[min])/(posx - min));
						if(posT < tempRET)
						{
							tempRE = posx;
							tempRET = posT;
						}
					}
					
					var estRE = tempRE, estRET = tempRET;

					for(posx = tempRE+1;posx <= searchMax; posx++)
					{
						var slope = (bg.height[min] - bg.height[posx])/(min - posx);
						//Try stepping further out, change bounds
						var hDist = min - tempRE;
						var diff = (bg.height[min] + (hDist * slope)) - bg.height[tempRE];
						if(diff < height/6)
						{	
							estRE = posx;
							estRET = Math.atan(slope);
						}
					}
					edgeLeft = edgeRight;
					edgeRight = estRE;
					underLength = -1 * (edgeRight - edgeLeft);
				} while(edgeRight < loopCond)
				underLength = -1 * (edgeRight - edgeLeft);
			}
			else //min == this.x && searchAngle == 0
			{
				searchAngle = 0;
				accumulator += searchAngle;
				continue;
			}
				
			searchAngle = normalize(-1*Math.atan((bg.height[edgeRight] - bg.height[edgeLeft])/(edgeRight - edgeLeft)));
			accumulator += searchAngle;

		} while(++counter < 4)
		
		newAngle = accumulator/counter;
		
		if(rotSpeed > 0 && rotSpeed + bangle > newAngle)
		{
			if(debug)
				console.log("RotSpeed was too fast (pos)!");
			rotSpeed = 	newAngle - bangle;
		}
		else if(rotSpeed < 0 && rotSpeed + bangle < newAngle)
		{
			if(debug)
				console.log("RotSpeed was too fast (neg)!");
			rotSpeed = newAngle - bangle;
		}
		else if(deltaX < 0 && newAngle < bangle)
		{
			if(debug)
				console.log("Drive up! (left)");
			rotSpeed = newAngle - bangle;
		}
		else if(deltaX > 0 && newAngle > bangle)
		{
			if(debug)
				console.log("Drive up! (right)");
			rotSpeed = newAngle - bangle;
		}
		
		this.updateBottom();
		
		if(angledebug)
			console.log("newAngle: " + newAngle);
		if(debug)
			console.log("UnderLength: " + underLength);
		if(minUnder == -1)
			console.log("wtf " + (height/2 + treHeight) + " " + this.y);
	}
		
	this.tryMove = function() {
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

	this.keyUpdate = function(d) {
		switch(d)
		{
		//	case 32: willdraw = !willdraw; break;
			case 83: console.log("here"); drawbangle = bangle; break;
			case 77: mark = (mark + 1) % 3; break;
			case 68: debug = !debug; break;
			case 65: angledebug = !angledebug; break;
			case 37: deltaX = -1*Math.round(width/12); break;
			case 39: deltaX = Math.round(width/12); break;
			case 38: gdiff += Math.PI/180; break;
			case 40: gdiff -= Math.PI/180; break;
		}
	}
	
	//this.reset = function() { this.delta = -1; }
	
	this.release = function(d) {
		switch(d)
		{
			case 37: deltaX = 0; break;
			case 39: deltaX = 0; break;
		}
	}
	
	this.init = function(x,y) {
	
		this.x = x;
		this.y = y;
		
		radius1 = Math.sqrt((height/2)*(height/2) + (width/2)*(width/2));
		radius2 = Math.sqrt((height/6)*(height/6) + (width/2)*(width/2));
		radius3 = Math.sqrt((height/2)*(height/2) + (width/3)*(width/3));
		radius4 = Math.sqrt((height/2)*(height/2) + (width/4)*(width/4));
		radius5 = Math.sqrt(turcp * turcp + (width/4)*(width/4));
		radius6 = Math.sqrt((width/2)*(width/2)+(height/2 + treHeight)*(height/2 + treHeight));
		radius7 = Math.sqrt((width/2 + treHeight)*(width/2 + treHeight) + (height/2 + treHeight/2)*(height/2 + treHeight/2));
		ang1 = Math.atan(height/width);
		ang2 = Math.PI - 2*ang1;
		ang3 = Math.atan((height/6)/(width/2));
		ang4 = Math.PI/2 - Math.atan((width/3)/(height/2));
		ang5 = Math.PI/2 - Math.atan((width/4)/(height/2));
		ang6 = Math.atan((width/4)/(turcp));
		ang7 = Math.atan((width/2)/(height/2 + treHeight));
		ang8 = Math.PI/2 - Math.atan((width/2 + treHeight)/(height/2 + treHeight/2));
		
		deltaY = 0;
		deltaX = 0;
		rotSpeed = 0;
		bangle = 0;
		drawbangle = bangle;
		gdiff = -Math.PI/2;
		this.gangle = drawbangle + gdiff;
		this.shotCoords[0] = this.x + turLen*Math.cos(this.gangle);
		this.shotCoords[1] = this.y - height/2 - turLen*Math.sin(this.gangle);
		
		slideDist = 0;
		firstX = (radius6*Math.cos(bangle - Math.PI/2 - ang7)) + this.x;
		
		this.updateRotOffsets();
		this.updateAngle();
		this.draw();
		return;
	}	
}
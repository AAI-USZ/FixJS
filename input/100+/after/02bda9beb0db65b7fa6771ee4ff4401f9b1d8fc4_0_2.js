function() {
		var searchAngle = bangle;
		var accumulator = 0;
		var counter = 0;
		
		do
		{
			//find the minimum ground coordinate (highest ground) under the tank
			var min = -1;
			var min_height = 10000;
			var CoM = this.x + height/3*Math.cos(searchAngle - Math.PI/2);
			var bottomRange = Math.round((radius6*Math.cos(searchAngle - Math.PI/2 - ang7)) + CoM);
			var topRange = (radius6*Math.cos(searchAngle - Math.PI/2 + ang7)) + CoM;
			
			for(minSearch=Math.round(bottomRange);minSearch<=topRange;minSearch++)
			{	
				//TODO: ignore ones that are way too high
				if(bg.height[minSearch] <= min_height)
				{
					if(bg.height[minSearch] < min_height ||  (Math.abs(minSearch - CoM) <= Math.abs(min - CoM)))
					{
						min = minSearch;
						min_height = bg.height[min];
					}
				}
			}
			minUnder = min;

			//TODO deal with rotational speed
			if(min > CoM || (CoM == min && searchAngle > 0))
			{
				var searchMin = Math.round(Math.min(CoM,bottomRange));
				var loopCond = Math.round(Math.max(CoM,bottomRange));
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
						var hDist = tempLE - min;
						var diff = (bg.height[min] + (hDist * slope)) - bg.height[tempLE];
						if(diff/width*5 < height/6)
						{	
							estLE = posx;
							estLET = Math.atan(slope);
						}
					}
					edgeRight = edgeLeft;
					edgeLeft = estLE;
				} while(edgeLeft > loopCond);
			}
			else if(min < CoM || (CoM == min && searchAngle < 0))
			{
				var searchMax = Math.round(Math.max(CoM,topRange));
				var loopCond = Math.round(Math.min(CoM,topRange));
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
						//Try stepping further o5ut, change bounds
						var hDist = tempRE - min;
						var diff = (bg.height[min] + (hDist * slope)) - bg.height[tempRE];
						if(diff/width*5 < height/6)
						{	
							estRE = posx;
							estRET = Math.atan(slope);
						}
					}
					edgeLeft = edgeRight;
					edgeRight = estRE;
				} while(edgeRight < loopCond);
			}
			else //min == CoM && searchAngle == 0
			{
				searchAngle = 0;
				accumulator += searchAngle;
				continue;
			}
				
			searchAngle = normalize(-1*Math.atan((bg.height[edgeRight] - bg.height[edgeLeft])/(edgeRight - edgeLeft)));
			accumulator += searchAngle;

		} while(++counter < 4);
		
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
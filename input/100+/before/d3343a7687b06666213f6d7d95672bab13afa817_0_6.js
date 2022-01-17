function(o){
		var t = this;
		//I see no reason to check whether the rotation/scale is different between processing each point,
		//so I'll just do that once per frame and have a loop just for rotating the points.
		if(o.lastRotString !== t.getP3String(o.rot) || o.lastScaleString !== t.getP3String(o.scale)){
			//console.log(o.lastRotString);
			o.transformedPointCache = [];
			for(var i = 0; i < o.shape.points.length; i += 1){
				//to make sure I'm not messing with the original array...
				var point = [o.shape.points[i][0],o.shape.points[i][1],o.shape.points[i][2]];
				point = t.getP3Scaled(point, o.scale);
				point = t.getP3Rotated(point, o.rot, o.rotOrder);
				point[3] = o.shape.points[i][3] || false;//Point Color Preservation - no need to offset or rotate it
				o.transformedPointCache[i] = point;
			}

			//Now with Z-Depth sorting for each line on an object!
			o.transformedLineCache = []; //Fixes a bug earlier where I -assumed- that transformedLineCache was already an array
			for(var i = 0; i < o.shape.lines.length; i += 1){
				//to make sure I'm not messing with the original array...
				if(o.shape.lines[i][2] !== undefined){
					var line = [o.shape.lines[i][0],o.shape.lines[i][1],o.shape.lines[i][2]];
				}else{
					var line = [o.shape.lines[i][0],o.shape.lines[i][1]];
				}
				o.transformedLineCache[i] = line;
			}
			//Fixing a nasty strange bug that happened if you sorted a one key array
			if(o.transformedLineCache.length > 1){
				o.transformedLineCache.sort(function(a,b) {
					var az = Math.min(
						o.transformedPointCache[a[0]][2],
						o.transformedPointCache[a[1]][2]
					);
					var bz = Math.min(
						o.transformedPointCache[b[0]][2],
						o.transformedPointCache[b[1]][2]
					);
					return az - bz;
				});
			}
			//end z-sorting for the lines

			o.boundingBox = t.nGetBounds(o.transformedPointCache);
			o.lastScaleString = t.getP3String(o.scale);
			o.lastRotString = t.getP3String(o.rot);
		}
	
		if(o.renderAlways){
			t.lineRenderLoop(o);
			return;
		}
	
		var bbMinOffset = t.getP3Offset(t.getP3Offset(o.boundingBox[0], o.pos), t.camera.pos);
		var bbMaxOffset = t.getP3Offset(t.getP3Offset(o.boundingBox[1], o.pos), t.camera.pos);
	
		//Checking to see if any part of the bounding box is in front on the camera and closer than the far plane before bothering to do anything else...
		if(bbMaxOffset[2] > t.camera.clipFar && bbMinOffset[2] < t.camera.clipNear && bbMaxOffset[2] > t.camera.clipFar && bbMaxOffset[2] < t.camera.clipNear){
			//Alright. It's in front and not behind. Now is the bounding box even partially on screen?
			//8 points determine the cube... let's start from the top left, spiraling down clockwise
			var bbCube = t.makeBBCubeFromTwoPoints(bbMinOffset,bbMaxOffset);
			var bbOffscreen = true;
			//At some point in the future if I wanted to get really crazy, I could probably determine which order
			//to sort the array above to orient the point closest to the center of the screen nearest the first of the list,
			//so I don't bother checking all 8 points to determine if it's on screen - or even off screen.
			for(var i = 0; i < bbCube.length && bbOffscreen; i += 1){
				bbp = t.project3Dto2D(bbCube[i]);
				if(bbp.x < t.cx && bbp.x > -t.cx && bbp.y < t.cy && bbp.y > -t.cy){
					bbOffscreen = false;
				}
			}
			if(!bbOffscreen){
				t.lineRenderLoop(o);
			}
		}
	}
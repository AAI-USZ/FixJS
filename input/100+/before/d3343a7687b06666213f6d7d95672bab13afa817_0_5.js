function(o){
		var t = this, c = t.c;
		var computedPointList = [];
		for(var i = 0; i < o.shape.points.length; i += 1){
			//to make sure I'm not messing with the original array...
			var point = [o.transformedPointCache[i][0],o.transformedPointCache[i][1],o.transformedPointCache[i][2]];
			point = t.getP3Offset(point, o.pos);
			point = t.getP3Offset(point, t.camera.pos);
			computedPointList[i] = point;
		}
		for(var i = 0; i < o.transformedLineCache.length; i += 1){
			//offset the points by the object's position
			if(o.explosionFrame === undefined){
				var p3a = computedPointList[o.transformedLineCache[i][0]];
				var p3b = computedPointList[o.transformedLineCache[i][1]];
			}else{
				//O great architect of all source that is far more elegant than that of my own,
				//please forgive me for the sins that I am about to commit with my limited remaining brain power... (6 AM)
				var t3a = o.transformedPointCache[o.transformedLineCache[i][0]];
				var t3b = o.transformedPointCache[o.transformedLineCache[i][1]];
				t3a = t.getP3Offset(t3a,[0,0,0]);
				t3b = t.getP3Offset(t3b,[0,0,0]);
				var lineCenter = [
					t3a[0] + ((t3b[0] - t3a[0]) /2),
					t3a[1] + ((t3b[1] - t3a[1]) /2),
					t3a[2] + ((t3b[2] - t3a[2]) /2)
				];
				var dir = Math.atan2( lineCenter[0], lineCenter[1]);
				var ofs = [Math.sin(dir) * o.explosionFrame*2,Math.cos(dir) * o.explosionFrame*2];
				//var ofs = [100,100];
				//var ofs = [1,2];
				t3a[0] = lineCenter[0] + ofs[0] + (Math.sin(o.explosionFrame*deg*10 + dir)*(t3a[0] - lineCenter[0]));
				t3a[1] = lineCenter[1] + ofs[1] + (Math.cos(o.explosionFrame*deg*10 + dir)*(t3a[1] - lineCenter[1]));
				t3b[0] = lineCenter[0] + ofs[0] + (Math.sin(o.explosionFrame*deg*10 + dir)*(t3b[0] - lineCenter[0]));
				t3b[1] = lineCenter[1] + ofs[1] + (Math.cos(o.explosionFrame*deg*10 + dir)*(t3b[1] - lineCenter[1]));
				t3a[2] = t3a[2] + (o.explosionFrame*2);
				t3b[2] = t3b[2] + (o.explosionFrame*2);
				p3a = t.getP3Offset(t.getP3Offset(t3a, o.pos), t.camera.pos);
				p3b = t.getP3Offset(t.getP3Offset(t3b, o.pos), t.camera.pos);
			}
	
	
			//if the depths of the first and second point in the line are not behind the camera...
			//and the depths of the first and second point in the line are closer than the far plane...
			if(p3a[2] < t.camera.clipNear &&
			   p3b[2] < t.camera.clipNear &&
			   p3a[2] > t.camera.clipFar &&
			   p3b[2] > t.camera.clipFar){
	
				var p0 = t.project3Dto2D(p3a);
				var p1 = t.project3Dto2D(p3b);
				//                   min        max
				var screenBounds = [[-t.cx, -t.cy],[t.cx, t.cy]];
				var p0InBounds = NPos3d.pointIn2dBounds([p0.x,p0.y],screenBounds);
				var p1InBounds = NPos3d.pointIn2dBounds([p1.x,p1.y],screenBounds);
				//If the line is completely off screen, do not bother rendering it.
				if(p0InBounds || p1InBounds){
					c.beginPath();
					c.moveTo(p0.x,p0.y);
					c.lineTo(p1.x,p1.y);
					c.strokeStyle= o.transformedLineCache[i][2] || o.shape.color || o.color || '#fff';
					c.lineWidth= o.lineWidth || o.scene.lineWidth || 2;
					c.lineCap='round';
					c.stroke();
				}
			}
		}
	}
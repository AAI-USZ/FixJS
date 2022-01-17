function(o){
		var t = this, c = t.c;
		var computedPointList = [];
		for(var i = 0; i < o.shape.points.length; i += 1){
			//to make sure I'm not messing with the original array...
			var point = [o.transformedPointCache[i][0],o.transformedPointCache[i][1],o.transformedPointCache[i][2]];
			point = t.getP3Offset(point, o.pos);
			point = t.getP3Offset(point, t.camera.pos);
			point[3] = o.transformedPointCache[i][3] || false;//Point Color Preservation - no need to offset or rotate it
			computedPointList[i] = point;
		}
		for(var i = 0; i < o.transformedPointCache.length; i += 1){
			//offset the points by the object's position
			var p3a = computedPointList[i];
			//if the depth of the point is not behind the camera...
			//and the depth of the point is closer than the far plane...
			if(p3a[2] < t.camera.clipNear && p3a[2] > t.camera.clipFar){
				var p0 = t.project3Dto2D(p3a);
				//                   min        max
				var screenBounds = [[-t.cx, -t.cy],[t.cx, t.cy]];
				var p0InBounds = NPos3d.pointIn2dBounds([p0.x,p0.y],screenBounds);
				//If the line is completely off screen, do not bother rendering it.
				if(p0InBounds){
					//console.log(p0.color);
					c.moveTo(p0.x,p0.y);
					c.beginPath();
					c.arc(p0.x,p0.y,(p0.scale * o.pointScale),0,tau,false);
					if(o.pointStyle === 'fill'){
						c.fillStyle= p0.color || o.shape.color || '#fff';
						c.fill();
					}else if(o.pointStyle === 'stroke'){
						c.strokeStyle= p0.color || o.shape.color || '#fff';
						c.lineWidth= o.lineWidth || o.scene.lineWidth || 2;
						c.lineCap='round';
						c.stroke();
					}
				}
			}
		}
	}
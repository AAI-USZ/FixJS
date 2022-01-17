function(obstPolys) {
			var hx = this.x+(this.d/2.0)*Math.cos(this.theta), 
				hy = this.y+(this.d/2.0)*Math.sin(this.theta), 
				htheta = this.theta;
			
			var hpoint = {x:hx, y:hy};
			var thetaDifs = [-PI/3.0, this.mid_sensor_angle, PI/3.0];
			for(var k = 0; k < 3; k++) {
				this.distSensor[k].theta = htheta+thetaDifs[k];
				var vline = createLineFromVector(hpoint, htheta+thetaDifs[k]);
				
				/*
				var intersectList = [];
				for(var i = 0; i < obstPolys.length; i++) {
					var lines = obstPolys[i].lines;
					for(var j = 0; j < lines.length; j++) {
						var pline = lines[j];
						var intersectPoint = getLineIntersection(pline, vline);
						if(intersectPoint != false)
							intersectList.push(intersectPoint);
					}
				}
			
				var minDist = DIST_SENSOR_MAX;
				var closestPoint = null;
				for(var i = 0; i < intersectList.length; i++) {
					var d = euclidDist(hpoint, intersectList[i]);
					if (d < minDist) {
						minDist = d;
						closestPoint = intersectList[i];
					}
				}
				*/
				
				var minDist = DIST_SENSOR_MAX;
				var closestPoint = gdo.getDist({p:hpoint,theta:this.distSensor[k].theta}, minDist);
			
				if (closestPoint != null) {
					var minDist = euclidDist(hpoint, closestPoint);
					this.distSensor[k].dist = minDist;
					this.distSensor[k].p = closestPoint;
				} else {
					this.distSensor[k].dist = minDist;
					this.distSensor[k].p = {
						x:(hpoint.x+minDist*Math.cos(htheta+thetaDifs[k])),
						y:(hpoint.y+minDist*Math.sin(htheta+thetaDifs[k]))
					};
				}
			}
		}
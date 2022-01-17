function(obstPolys) {
			var hx = this.x+(this.d/2.0)*Math.cos(this.theta), 
				hy = this.y+(this.d/2.0)*Math.sin(this.theta), 
				htheta = this.theta;
			
			var hpoint = {x:hx, y:hy};
			var thetaDifs = [-PI/3.0, this.mid_sensor_angle, PI/3.0];
			for(var k = 0; k < 3; k++) {
				this.distSensor[k].theta = htheta+thetaDifs[k];
				var vline = createLineFromVector(hpoint, htheta+thetaDifs[k]);
				
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
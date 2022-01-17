function (p3,rot,order) {
		//return p3;
		var t = this, x = p3[0], y = p3[1], z = p3[2], xr = rot[0], yr = rot[1], zr = rot[2];
		//Alright, here's something interesting.
		//The order you rotate the dimentions is IMPORTANT to rotation animation!
		//Here's my quick, no math approach to applying that.
		for (var r = 0; r < order.length; r += 1) {
			if (order[r] === 0) {
				//x...
				if (xr !== 0) {
					var zy = t.rotatePoint(z,y,xr);
					z = zy[0];
					y = zy[1];
					t.totalRotationCalculations += 1;
				}
			}else if (order[r] === 1) {
				//y...
				if (yr !== 0) {
					var xz = t.rotatePoint(x,z,yr);
					x = xz[0];
					z = xz[1];
					t.totalRotationCalculations += 1;
				}
			}else if (order[r] === 2) {
				//z...
				if (zr !== 0) {
					var xy = t.rotatePoint(x,y,zr);
					x = xy[0];
					y = xy[1];
					t.totalRotationCalculations += 1;
				}
			} else {
				throw 'up';
			}
		}
		return [x,y,z];
	}
function() {
	var minTime = 1;
	var displacementLength = Math.abs(jeash.geom.Vector3D.distance(this.displ,new jeash.geom.Vector3D()));
	var t;
	var indicesLength = this.numI;
	var j = 0;
	var i = 0;
	var p1x;
	var p1y;
	var p1z;
	var p2x;
	var p2y;
	var p2z;
	var nSides;
	var locI;
	var k = 0;
	while(k < indicesLength) {
		locI = i = k;
		var index = this.indices[i];
		i++;
		nSides = (index & -268435456) >> 28;
		k += nSides;
		index &= 268435455;
		index *= 3;
		var ax = this.vertices[index];
		index++;
		var ay = this.vertices[index];
		index++;
		var az = this.vertices[index];
		index = this.indices[i] * 3;
		i++;
		var bx = this.vertices[index];
		index++;
		var by = this.vertices[index];
		index++;
		var bz = this.vertices[index];
		index = this.indices[i] * 3;
		i++;
		var cx = this.vertices[index];
		index++;
		var cy = this.vertices[index];
		index++;
		var cz = this.vertices[index];
		var normalX = this.normals[j];
		j++;
		var normalY = this.normals[j];
		j++;
		var normalZ = this.normals[j];
		j++;
		var offset = this.normals[j];
		j++;
		var distance = this.src.x * normalX + this.src.y * normalY + this.src.z * normalZ - offset;
		var pointX;
		var pointY;
		var pointZ;
		if(distance < this.radius) {
			pointX = this.src.x - normalX * distance;
			pointY = this.src.y - normalY * distance;
			pointZ = this.src.z - normalZ * distance;
		} else {
			var t1 = (distance - this.radius) / (distance - this.dest.x * normalX - this.dest.y * normalY - this.dest.z * normalZ + offset);
			pointX = this.src.x + this.displ.x * t1 - normalX * this.radius;
			pointY = this.src.y + this.displ.y * t1 - normalY * this.radius;
			pointZ = this.src.z + this.displ.z * t1 - normalZ * this.radius;
		}
		var faceX = 0;
		var faceY = 0;
		var faceZ = 0;
		var min = 1e+22;
		var inside = true;
		p1x = ax;
		p1y = ay;
		p1z = az;
		var startI = locI;
		locI++;
		var count = 0;
		var _g = 0;
		while(_g < nSides) {
			var n = _g++;
			count++;
			index = count != nSides?this.indices[locI] * 3:(this.indices[startI] & 268435455) * 3;
			p2x = this.vertices[index];
			index++;
			p2y = this.vertices[index];
			index++;
			p2z = this.vertices[index];
			locI++;
			var abx = p2x - p1x;
			var aby = p2y - p1y;
			var abz = p2z - p1z;
			var acx = pointX - p1x;
			var acy = pointY - p1y;
			var acz = pointZ - p1z;
			var crx = acz * aby - acy * abz;
			var cry = acx * abz - acz * abx;
			var crz = acy * abx - acx * aby;
			if(crx * normalX + cry * normalY + crz * normalZ < 0) {
				var edgeLength = abx * abx + aby * aby + abz * abz;
				var edgeDistanceSqr = (crx * crx + cry * cry + crz * crz) / edgeLength;
				if(edgeDistanceSqr < min) {
					edgeLength = Math.sqrt(edgeLength);
					abx /= edgeLength;
					aby /= edgeLength;
					abz /= edgeLength;
					t = abx * acx + aby * acy + abz * acz;
					var acLen;
					if(t < 0) {
						acLen = acx * acx + acy * acy + acz * acz;
						if(acLen < min) {
							min = acLen;
							faceX = p1x;
							faceY = p1y;
							faceZ = p1z;
						}
					} else if(t > edgeLength) {
						acx = pointX - p2x;
						acy = pointY - p2y;
						acz = pointZ - p2z;
						acLen = acx * acx + acy * acy + acz * acz;
						if(acLen < min) {
							min = acLen;
							faceX = p2x;
							faceY = p2y;
							faceZ = p2z;
						}
					} else {
						min = edgeDistanceSqr;
						faceX = p1x + abx * t;
						faceY = p1y + aby * t;
						faceZ = p1z + abz * t;
					}
				}
				inside = false;
			}
			p1x = p2x;
			p1y = p2y;
			p1z = p2z;
		}
		if(inside) {
			faceX = pointX;
			faceY = pointY;
			faceZ = pointZ;
		}
		var deltaX = this.src.x - faceX;
		var deltaY = this.src.y - faceY;
		var deltaZ = this.src.z - faceZ;
		if(deltaX * this.displ.x + deltaY * this.displ.y + deltaZ * this.displ.z <= 0) {
			var backX = -this.displ.x / displacementLength;
			var backY = -this.displ.y / displacementLength;
			var backZ = -this.displ.z / displacementLength;
			var deltaLength = deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;
			var projectionLength = deltaX * backX + deltaY * backY + deltaZ * backZ;
			var projectionInsideLength = this.radius * this.radius - deltaLength + projectionLength * projectionLength;
			if(projectionInsideLength > 0) {
				var time = (projectionLength - Math.sqrt(projectionInsideLength)) / displacementLength;
				if(time < minTime) {
					minTime = time;
					this.collisionPoint.x = faceX;
					this.collisionPoint.y = faceY;
					this.collisionPoint.z = faceZ;
					if(inside) {
						this.collisionPlane.x = normalX;
						this.collisionPlane.y = normalY;
						this.collisionPlane.z = normalZ;
						this.collisionPlane.w = offset;
					} else {
						deltaLength = Math.sqrt(deltaLength);
						this.collisionPlane.x = deltaX / deltaLength;
						this.collisionPlane.y = deltaY / deltaLength;
						this.collisionPlane.z = deltaZ / deltaLength;
						this.collisionPlane.w = this.collisionPoint.x * this.collisionPlane.x + this.collisionPoint.y * this.collisionPlane.y + this.collisionPoint.z * this.collisionPlane.z;
					}
				}
			}
		}
	}
	return minTime < 1;
}
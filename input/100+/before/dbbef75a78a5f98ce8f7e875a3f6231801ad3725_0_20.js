function() {
	var rad = this.radius + Math.abs(jeash.geom.Vector3D.distance(this.displ,new jeash.geom.Vector3D()));
	this.numI = 0;
	this.numFaces = 0;
	var indicesLength = 0;
	var normalsLength = 0;
	var j;
	var verticesLength = 0;
	var geometriesLength = this.geometries.length;
	var transform = this.inverseMatrix;
	var vx;
	var vy;
	var vz;
	var oa;
	var numVertices;
	var geometryIndicesLength;
	var verts;
	var geometry;
	var nSides;
	var geometryIndices;
	if(geometriesLength > 400) {
		haxe.Log.trace("Too much geometries!" + geometriesLength,{ fileName : "EllipsoidCollider.hx", lineNumber : 238, className : "a3d.EllipsoidCollider", methodName : "loopGeometries"});
		return;
	}
	{
		var _g = 0;
		while(_g < geometriesLength) {
			var i = _g++;
			geometry = this.geometries[i];
			geometryIndices = geometry.indices;
			geometryIndicesLength = geometryIndices.length;
			verts = geometry.vertices;
			numVertices = geometry.numVertices;
			{
				var _g1 = 0;
				while(_g1 < numVertices) {
					var j1 = _g1++;
					vx = verts[j1 * 3];
					vy = verts[j1 * 3 + 1];
					vz = verts[j1 * 3 + 2];
					this.vertices[verticesLength] = transform.a * vx + transform.b * vy + transform.c * vz + transform.d;
					verticesLength++;
					this.vertices[verticesLength] = transform.e * vx + transform.f * vy + transform.g * vz + transform.h;
					verticesLength++;
					this.vertices[verticesLength] = transform.i * vx + transform.j * vy + transform.k * vz + transform.l;
					verticesLength++;
				}
			}
			j = 0;
			var k = 0;
			while(k < geometryIndicesLength) {
				j = k;
				var a = geometryIndices[j];
				j++;
				nSides = (a & -268435456) >> 28;
				k += nSides;
				oa = a;
				a &= 268435455;
				var index = a * 3;
				var ax = this.vertices[index];
				index++;
				var ay = this.vertices[index];
				index++;
				var az = this.vertices[index];
				var b = geometryIndices[j];
				j++;
				index = b * 3;
				var bx = this.vertices[index];
				index++;
				var by = this.vertices[index];
				index++;
				var bz = this.vertices[index];
				var c = geometryIndices[j];
				j++;
				index = c * 3;
				var cx = this.vertices[index];
				index++;
				var cy = this.vertices[index];
				index++;
				var cz = this.vertices[index];
				if(nSides == 3) {
					if(ax > rad && bx > rad && cx > rad || ax < -rad && bx < -rad && cx < -rad) continue;
					if(ay > rad && by > rad && cy > rad || ay < -rad && by < -rad && cy < -rad) continue;
					if(az > rad && bz > rad && cz > rad || az < -rad && bz < -rad && cz < -rad) continue;
				}
				var abx = bx - ax;
				var aby = by - ay;
				var abz = bz - az;
				var acx = cx - ax;
				var acy = cy - ay;
				var acz = cz - az;
				var normalX = acz * aby - acy * abz;
				var normalY = acx * abz - acz * abx;
				var normalZ = acy * abx - acx * aby;
				var len = normalX * normalX + normalY * normalY + normalZ * normalZ;
				if(len < 0.001) continue;
				len = 1 / Math.sqrt(len);
				normalX *= len;
				normalY *= len;
				normalZ *= len;
				var offset = ax * normalX + ay * normalY + az * normalZ;
				if(offset > rad || offset < -rad) continue;
				this.indices[indicesLength] = oa;
				indicesLength++;
				this.indices[indicesLength] = b;
				indicesLength++;
				this.indices[indicesLength] = c;
				indicesLength++;
				this.normals[normalsLength] = normalX;
				normalsLength++;
				this.normals[normalsLength] = normalY;
				normalsLength++;
				this.normals[normalsLength] = normalZ;
				normalsLength++;
				this.normals[normalsLength] = offset;
				normalsLength++;
				{
					var _g1 = 3;
					while(_g1 < nSides) {
						var n = _g1++;
						c = geometryIndices[j];
						j++;
						this.indices[indicesLength] = c;
						indicesLength++;
					}
				}
				this.numFaces++;
			}
		}
	}
	this.geometries.length = 0;
	this.numI = indicesLength;
}
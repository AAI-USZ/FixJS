function(source,displacement,collidable) {
	if(Math.abs(jeash.geom.Vector3D.distance(displacement,new jeash.geom.Vector3D())) <= this.threshold) {
		this.gotMoved = false;
		return new jeash.geom.Vector3D(source.x,source.y,source.z,source.w);
	}
	this.gotMoved = true;
	this.timestamp++;
	this.prepare(source,displacement);
	collidable.collectGeometry(this);
	this.loopGeometries();
	var result;
	if(this.numFaces > 0) {
		{
			var _g = 0;
			while(_g < 50) {
				var i = _g++;
				if(this.checkCollision()) {
					var offset = this.radius + this.threshold + this.collisionPlane.w - this.dest.x * this.collisionPlane.x - this.dest.y * this.collisionPlane.y - this.dest.z * this.collisionPlane.z;
					this.dest.x += this.collisionPlane.x * offset;
					this.dest.y += this.collisionPlane.y * offset;
					this.dest.z += this.collisionPlane.z * offset;
					this.src.x = this.collisionPoint.x + this.collisionPlane.x * (this.radius + this.threshold);
					this.src.y = this.collisionPoint.y + this.collisionPlane.y * (this.radius + this.threshold);
					this.src.z = this.collisionPoint.z + this.collisionPlane.z * (this.radius + this.threshold);
					this.displ.x = this.dest.x - this.src.x;
					this.displ.y = this.dest.y - this.src.y;
					this.displ.z = this.dest.z - this.src.z;
					if(Math.abs(jeash.geom.Vector3D.distance(this.displ,new jeash.geom.Vector3D())) < this.threshold) break;
				}
				else break;
			}
		}
		result = new jeash.geom.Vector3D(this.matrix.a * this.dest.x + this.matrix.b * this.dest.y + this.matrix.c * this.dest.z + this.matrix.d,this.matrix.e * this.dest.x + this.matrix.f * this.dest.y + this.matrix.g * this.dest.z + this.matrix.h,this.matrix.i * this.dest.x + this.matrix.j * this.dest.y + this.matrix.k * this.dest.z + this.matrix.l);
	}
	else {
		result = new jeash.geom.Vector3D(source.x + displacement.x,source.y + displacement.y,source.z + displacement.z);
	}
	return a3d.EllipsoidCollider.isNaN2(result.x)?new jeash.geom.Vector3D(source.x,source.y,source.z,source.w):result;
}
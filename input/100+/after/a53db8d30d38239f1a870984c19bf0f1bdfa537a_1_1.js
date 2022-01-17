function AABB(){
		// ccw vertices arrangement
		// 0------3
		// |      |
		// 1------2
		this.vertices = [];
		this.vertices[0] = new Vec2();
		this.vertices[1] = new Vec2();
		this.vertices[2] = new Vec2();
		this.vertices[3] = new Vec2();

		this.lowerBound = this.vertices[0];
		this.upperBound = this.vertices[2];

		this.dirty = true;
	}
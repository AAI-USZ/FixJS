function AABB(rect){
		if(rect == null)
			rect = new Rect();
		// ccw vertices arrangement
		// 0------3
		// |      |
		// 1------2
		this.vertices = [];
		this.vertices[0] = new Vec2(rect.x, rect.y);
		this.vertices[1] = new Vec2(rect.left, rect.bottom);
		this.vertices[2] = new Vec2(rect.right, rect.bottom);
		this.vertices[3] = new Vec2(rect.right, rect.top);

		this.lowerBound = this.vertices[0];
		this.upperBound = this.vertices[2];
	}
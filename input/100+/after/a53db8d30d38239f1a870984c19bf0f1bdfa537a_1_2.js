function(window){
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
	var p = AABB.prototype;

	Object.defineProperty(p, 'x', {
		get: function(){
			return this.vertices[0].x;
		}
	});

	Object.defineProperty(p, 'y', {
		get: function(){
			return this.vertices[0].y;
		}
	});

	Object.defineProperty(p, 'width', {
		get: function(){
			return this.upperBound.x - this.lowerBound.x;
		}
	});

	Object.defineProperty(p, 'height', {
		get: function(){
			return this.upperBound.y - this.lowerBound.y;
		}
	});

	AABB.compute = function(rect, matrix){
		var aabb = new AABB(rect);
		return aabb.compute(m);
	};

	/**
	* comput AABB
	*/
	p.compute = function(rect, matrix){
		if(this.dirty){
			// ccw vertices arrangement
			// 0------3
			// |      |
			// 1------2
			this.vertices[0].setPosition(rect.x, rect.y);
			this.vertices[1].setPosition(rect.left, rect.bottom);
			this.vertices[2].setPosition(rect.right, rect.bottom);
			this.vertices[3].setPosition(rect.right, rect.top);


			var lowerBound = matrix.transform(this.vertices[0]);
			var upperBound = lowerBound;

			for(var i=1; i<4; ++i){
				matrix.transform(this.vertices[i]);
				lowerBound = Vec2.min(lowerBound, this.vertices[i]);
				upperBound = Vec2.max(upperBound, this.vertices[i]);
			}
			this.lowerBound = lowerBound;
			this.upperBound = upperBound;

			this.dirty = false;
		}
	};

	/*
	
	*/
	p.transformBy = function(matrix){
		var lowerBound = matrix.transform(this.vertices[0]);
		var upperBound = lowerBound;

		for(var i=1; i<4; ++i){
			matrix.transform(this.vertices[i]);
			lowerBound = Vec2.min(lowerBound, this.vertices[i]);
			upperBound = Vec2.max(upperBound, this.vertices[i]);
		}
		this.lowerBound = lowerBound;
		this.upperBound = upperBound;
	};

	AABB.merge = function(aabb1, aabb2){
		var aabb3 = aabb1.clone();
		return aabb3.merge(aabb2);
	};

	p.merge = function(aabb){
		this.lowerBound = Vec2.min(this.lowerBound, aabb.lowerBound);
		this.upperBound = Vec2.max(this.upperBound, aabb.upperBound);
		return this;
	};

	p.generateRect = function(){
		return new Rect(this.lowerBound.x, this.lowerBound.y, this.upperBound.x-this.lowerBound.x, this.upperBound.y-this.lowerBound.y);
	};

	p.clone = function(){
		return new AABB(this.generateRect);
	};

	window.AABB = AABB;
}
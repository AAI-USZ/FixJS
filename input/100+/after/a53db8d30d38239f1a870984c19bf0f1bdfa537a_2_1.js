function(window){
	function Bitmap(src){
		this.init(src);
	}
	var p = Bitmap.prototype = new DisplayObject();

	p.super_init = p.init;
	p.init = function(src){
		this.super_init();

		// the rectangle object define the area of the object, e.g., the image width and height
		this._rect = new Rect();

		if(typeof src == 'string'){
			this.image = new Image();
			this.image.onload = bind(this, function(){
				this._rect.width = this.image.width;
				this._rect.height = this.image.height;
			});
			this.image.src = src;
		}
		else{
			this.image = src;
			this._rect.width = this.image.width;
			this._rect.height = this.image.height;
		}
	};

	p.draw = function(ctx){
		if(!this.visible)
			return;

		// update matrix, getting ready for apply to the context.
		this.updateMatrix();

		// push the current matrix state to the stack
		ctx.save();
		// 2d affine transform
		ctx.transform(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty);
		// ctx.drawImage(this.image, this._rect.x, this._rect.y, this._rect.width, this._rect.height, 0, 0, this._rect.width, this._rect.height);
		ctx.drawImage(this.image, 0, 0);

		// pop the last saved matrix state, assign to the context.
		ctx.restore();
	};

	Object.defineProperty(p, "rootAABB", {
		get: function(){
			// notice that this.matrix getter will call updateMatrix() function to ensure the matrix applied to this object is update to date.
			this._rootAABB.compute(this._rect, this.concatedMatrix);

			return this._rootAABB;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "localAABB", {
		get: function(){
			// notice that this.matrix getter will call updateMatrix() function to ensure the matrix applied to this object is update to date.
			this._localAABB.compute(this._rect, this.matrix);

			return this._localAABB;
		}
	});

	/*
	Get an AABB in the targeted corodinate system
	*/
	p.getAABB = function(targetCoordinate){
		var aabb = new AABB();
		// identity matrix applied to the rectangle.
		aabb.compute(this._rect, new Mat3());
		var currentObj = this;
		while(currentObj != targetCoordinate){
			aabb.transformBy(currentObj.matrix);
			currentObj = currentObj.parent;
		}
		return aabb;
	};

	Object.defineProperty(p, "isOnStage", {
		get: function(){
			return this.stage != null;
		}
	});

	window.Bitmap = Bitmap;
}
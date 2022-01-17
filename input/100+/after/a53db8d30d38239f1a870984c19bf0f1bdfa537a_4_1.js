function(){
		this.stage = null;
		this.visible = true;

		this.parent = null;

		this._x = 0;
		this._y = 0;

		this._radian = 0;
		this._scaleX = 1;
		this._scaleY = 1;

		// 2d affine transform matrix, internal use only.
		this._m = new Mat3();
		this._cm = new Mat3();

		// TODO: Axis-aligned bounding box, for speeding up the rendering and hit test
		this._localAABB = new AABB();
		this._rootAABB = new AABB();

		// The point representing the position of the GameObject
		this._anchorX = 0;
		this._anchorY = 0;


		this.dirtyMatrix = true;
	}
function(window){
	/**
	* Abstract class
	*/
	function DisplayObject(){
		this.klass = "DisplayObject";
		this.init();
	}
	var p = DisplayObject.prototype = new GameObject();

	p.init = function(){
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
	};

	p.updateMatrix = function(){
		if(this.dirtyMatrix){
			this._m.identity();

			// Notice that these convinient methods act like generating corresponding transform matrix.
			// The new matrix will be multiply to the current matrix:
			//		this._m = newMatrix * this._m.
			// Which means, the matrix gernerated by earlier methods will be applied first, the latter matrix will be applied later.
			// Therefore, the transform sequence shoud be:
			//		anchor translate  ->  scale  -> rotate  ->  position translate.
			this._m.translate(-this.anchorX, -this.anchorY);//anchor translation transform
			this._m.scale(this._scaleX, this._scaleY);// scale transform
			this._m.rotate(this._radian);//rotation transform
			this._m.translate(this._x, this._y);//normal position translation transform

			this.dirtyMatrix = false;
		}
	};

	p.draw = function(ctx){

	};

	Object.defineProperty(p, "matrix", {
		get: function(){
			// ensure the matrix is up to date.
			this.updateMatrix();
			return this._m;
		},
		set: function(m){
			this._m = m;

			/**
			*	We assume the matrix will only contains 2D affine transformation, and only an extra Z translation, for now, ignore the translation elements
			*		| cos(r)*scaleX    -sin(r)*skewX	0  |
			*		| sin(r)*skewY		cos(r)*scaleY	0  |
			*		| 0					0				1  |
			*
			*	If we apply this matrix to a point at (1.0f, 0.0f)
			*		x' = cos(r) * scaleX
			*		y' = sin(r) * skewY
			*
			*	The rotation then will be:
			*		atan2f(x', y')
			*	===>>
			*		_rotation = atan2f(_transform[1], _transform[0])
			*
			*
			*	Also the scale will be:
			*		scaleX = _transform[0] / cos(r)
			*		scaleY = _transform[5] / cos(r)
			*/
			this.radian = Math.atan2(this._m.b, this._m.a);

			var cos = Math.cos(this.radian);
			this._scaleX = this._m.a/cos;
			this._scaleY = this._m.d/cos;

			this._x = this._m.tx - this._anchorX;
			this._y = this._m.ty - this._anchorY;

			this.dirtyAABB = true;
			this.dirtyMatrix = true;
		}
	});

	Object.defineProperty(p, "concatedMatrix", {
		get: function(){
			// just in case the matrix applied to this object is dirty.
			this.updateMatrix();

			this._cm.a = this._m.a;
			this._cm.b = this._m.b;
			this._cm.c = this._m.c;
			this._cm.d = this._m.d;
			this._cm.tx = this._m.tx;
			this._cm.ty = this._m.ty;

			if(this.parent != null){
				return this._cm.prependMatrix(this.parent.concatedMatrix);
			}
			else
				return this._cm;
		}
	});

	Object.defineProperty(p, "x", {
		get: function(){
			return this._x;
		},
		set: function(x){
			this._x = x;
			this.dirtyMatrix = true;
			this.dirtyAABB = true;
		}
	});

	Object.defineProperty(p, "y", {
		get: function(){
			return this._y;
		},
		set: function(y){
			this._y = y;
			this.dirtyMatrix = true;
			this.dirtyAABB = true;
		}
	});

	Object.defineProperty(p, "scaleX", {
		get: function(){
			return this._scaleX;
		},
		set: function(sx){
			this._scaleX = sx;
			this.dirtyMatrix = true;
			this.dirtyAABB = true;
		}
	});

	Object.defineProperty(p, "scaleY", {
		get: function(){
			return this._scaleY;
		},
		set: function(sy){
			this._scaleY = sy;
			this.dirtyMatrix = true;
			this.dirtyAABB = true;
		}
	});

	Object.defineProperty(p, "radian", {
		get: function(){
			return this._radian;
		},
		set: function(radian){
			this._radian = radian;
			this.dirtyMatrix = true;
			this.dirtyAABB = true;
		}
	});

	Object.defineProperty(p, "anchorX", {
		get: function(){
			return this._anchorX;
		},
		set: function(x){
			this._anchorX = x;
			this.dirtyMatrix = true;
			this.dirtyAABB = true;
		}
	});

	Object.defineProperty(p, "anchorY", {
		get: function(){
			return this._anchorY;
		},
		set: function(y){
			this._anchorY = y;
			this.dirtyMatrix = true;
			this.dirtyAABB = true;
		}
	});

	Object.defineProperty(p, "localAABB", {
		get: function(){
			// dummy getter
			return this._localAABB;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "rootAABB", {
		get: function(){
			return this._rootAABB;
		}
	});

	// Although this is a public property, it should be used internally.
	Object.defineProperty(p, "dirtyAABB", {
		get: function(){
			// dummy getter
			return this._aabb;
		},
		set: function(isDirty){
			this._rootAABB.dirty = isDirty;
			this._localAABB.dirty = isDirty;

			// If this DisplayObject's bounding box become dirty, then its parent Container's bounding box MIGHT
			// needs to be re-comput as well.
			if(isDirty && this.parent != null)
				this.parent.dirtyAABB = true;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "width", {
		get: function(){
			return this._localAABB.width;
		},
		set: function(width){
			// do nothing, need implementation.
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "height", {
		get: function(){
			return this._localAABB.height;
		},
		set: function(height){
			// do nothing, need implementation.
		}
	});

	p.getGlobalVec2 = function(v){
		// var invert = this.concatedMatrix.clone().invert();
		// return invert.transform(v);
		var invert = this.concatedMatrix.clone().invert();
        return invert.transform(v);

	};

	// private method, internal use only
	p.setStage = function(stage){
		this.stage = stage;
	};

	window.DisplayObject = DisplayObject;
}
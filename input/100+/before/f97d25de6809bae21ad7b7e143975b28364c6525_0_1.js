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
	}

	p.draw = function(ctx){
		if(!this.visible)
			return;

		// update matrix, getting ready for apply to the context.
		this.updateMatrix();

		// push the current matrix state to the stack
		ctx.save();
		// 2d affine transform
		ctx.transform(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty)
		// ctx.drawImage(this.image, this._rect.x, this._rect.y, this._rect.width, this._rect.height, 0, 0, this._rect.width, this._rect.height);
		ctx.drawImage(this.image, 0, 0);

		// pop the last saved matrix state, assign to the context.
		ctx.restore();
	}

	Object.defineProperty(p, "aabb", {
		get: function(){
			// compute aabb
			if(this.dirtyAABB){
				// update the matrix just in case it is dirty.
				this.updateMatrix();
				this._aabb.compute(this._rect, this.concatedMatrix);
				// mark the aabb dirty to be false, so no need to comput the aabb again.
				this.dirtyAABB = false;
			}

			return this._aabb;
		},
	})

	Object.define(p, "isOnStage", {
		get: function(){
			return this.stage != null;
		}
	})

	window.Bitmap = Bitmap;
}
function(isDirty){
			this._rootAABB.dirty = isDirty;
			this._localAABB.dirty = isDirty;

			// If this DisplayObject's bounding box become dirty, then its parent Container's bounding box MIGHT
			// needs to be re-comput as well.
			if(isDirty && this.parent != null)
				this.parent.dirtyAABB = true;
		}
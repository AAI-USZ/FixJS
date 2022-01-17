function(flag){
			// only calculate the aabb when it is enabled.
			if(this.allowAABB){
				this._dirtyAABB = flag;

				// If this DisplayObject's bounding box become dirty, then its parent Container's bounding box MIGHT
				// needs to be re-comput as well.
				if(flag && this.parent != null)
					this.parent.dirtyAABB = true;
			}
		}
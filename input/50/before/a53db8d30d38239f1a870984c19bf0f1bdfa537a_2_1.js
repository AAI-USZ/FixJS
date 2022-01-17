function(){
			// compute aabb
			if(this.dirtyAABB){
				// update the matrix just in case it is dirty.
				this.updateMatrix();
				this._aabb.compute(this._rect, this.concatedMatrix);
				// mark the aabb dirty to be false, so no need to comput the aabb again.
				this.dirtyAABB = false;
			}

			return this._aabb;
		}
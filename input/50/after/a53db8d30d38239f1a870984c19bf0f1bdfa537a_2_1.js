function(){
			// notice that this.matrix getter will call updateMatrix() function to ensure the matrix applied to this object is update to date.
			this._rootAABB.compute(this._rect, this.concatedMatrix);

			return this._rootAABB;
		}
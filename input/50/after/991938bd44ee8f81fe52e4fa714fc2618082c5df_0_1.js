function(){
			this._outstandingPaintOperations--;

			if(this._outstandingPaintOperations <= 0 && !this._adjustWidthsTimer && this._started){
				// Use defer() to avoid a width adjustment when another operation will immediately follow,
				// such as a sequence of opening a node, then it's children, then it's grandchildren, etc.
				this._adjustWidthsTimer = this.defer("_adjustWidths");
			}
		}
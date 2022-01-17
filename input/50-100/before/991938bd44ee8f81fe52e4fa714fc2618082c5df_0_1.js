function(/*Promise|Boolean*/ p){
		// summary:
		//		Called at the start of an operation that will change what's displayed.
		// p:
		//		Promise that tells when the operation will complete.  Alternately, if it's just a Boolean, it signifies
		//		that the operation was synchronous, and already completed.

		if(!this._started){ return; }

		this._outstandingPaintOperations++;
		if(this._adjustWidthsTimer){
			this._adjustWidthsTimer.remove();
			delete this._adjustWidthsTimer;
		}

		var oc = lang.hitch(this, function(){
			this._outstandingPaintOperations--;

			if(this._outstandingPaintOperations <= 0 && !this._adjustWidthsTimer){
				// Use defer() to avoid a width adjustment when another operation will immediately follow,
				// such as a sequence of opening a node, then it's children, then it's grandchildren, etc.
				this._adjustWidthsTimer = this.defer("_adjustWidths");
			}
		});
		when(p, oc, oc);
	}
function(runID, cascade) {
		if (undefined === runID)
			throw "missing runID - failed removeListeners()";
		
		if ( this.listeners[runID] !== undefined ) {
			for (var i = 0; i < this.listeners[runID].length; ++i) {
				var listener = this.listeners[runID][i];
				listener.owner.off(listener.event, listener.id);
			}
		}
		
		if (undefined === cascade) {
			cascade = true;
		}
		
		if ( ! cascade)
			return;
			
		for (var i = 0; i < this.childNodeControllers.length; ++i) {
			this.childNodeControllers[i].nodeController.removeListeners(runID, true);
		}
	}
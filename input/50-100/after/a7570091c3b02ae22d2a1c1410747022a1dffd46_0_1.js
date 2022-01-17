function(event) {
        	var i = 0, 
    			targetIndex = 0;
        	// One or more elements have been added to the stage.
        	// We need to add them to the timeline.
        	if (typeof(event.detail.length) === "undefined") {
        		// This is a standard element creation event.
        		this.createStageElementsAt(false, [event.detail]);
        	} else {
        		// This is a paste action, because event.detail has more than one item in it.
        		this.createStageElementsAt(true, event.detail);
        	}
        }
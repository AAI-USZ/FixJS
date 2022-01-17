function(event) {
        	var i = 0, 
    			targetIndex = 0;
        	// One or more elements have been added to the stage.
        	// We need to add them to the timeline.
        	// But where?
        	// If there are no layers, we can just leave targetIndex at 0.
        	if (this.arrLayers.length !== 0) {
        		// If nothing is selected, we can leave 
        		var firstInsertedElement;
        		if (typeof(event.detail.length) === "undefined") {
        			firstInsertedElement = event.detail;
        		} else {
        			firstInsertedElement = event.detail[0];
        		}
        		
        		
        	}

        	if (typeof(event.detail.length) === "undefined") {
        		// This is a standard element creation event.
        		this.createStageElementsAt(false, [event.detail]);
        	} else {
        		// This is a paste action, because event.detail has more than one item in it.
        		this.createStageElementsAt(true, event.detail);
        	}
        }
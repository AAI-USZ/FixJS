function(start) {
		
		var cp, adj, adjustment, intersector, i, p, y,
			cacheTimes = this.times,
			changes = this.changes,
			current, x = 0, t = changes.length,
			moreChanges = 0;
		
		// if this is the first iteration
		for(; x < t; x++) {
			current = changes[x];
			// if it's the first iteration, set properties
			// on the matching element
			if (start) {
				// current is the same as the start elm
				// ie. what element the mouse entered on
				if (current.elm[0] === start.elm[0]) {
					// simple flag to know which element is the beginning node
					current.start = true;
					current.change = current.expanded;
					moreChanges++;
					// break out of loop, for next iteration
					break;
				}
			}
			
			// if an element has been marked for change and is not adjusted (complete)
			if (current.change && !current.adjusted ) {
				if (!this.first) {
					this.first = true;
					current.adjusted = true;
				}
				// does this element overlap with any other elements
				i = this.intersectors(current, true);
				
				for(y = 0; y < i.length; y++) {
					intersector = i[y];
					
					// don't make changes to the current elm
					if (!intersector.start && intersector.elm[0] !== current.elm[0]) {
						// calculate the css changes
						adjustment = this.adjust(intersector, current);
						
						// loop through list of changes to update
						for(p = 0; p < changes.length; p++) {
							
							if (intersector.elm[0] === changes[p].elm[0] && !changes[p].adjusted) {
								cp = changes[p];
								adj = adjustment[0];
								
								// if this has been changed and the change/adjustments
								// are the same mark as adjusted
								if (cp.change && 
									(cp.change.width === adj.width && 
									cp.change.height === adj.height && 
									cp.change.left === adj.left && 
									cp.change.top === adj.top)) {
									changes[p].adjusted = true;
								} else {
									// apply adjustments to the change obj
									changes[p].change = adjustment[0];
									moreChanges++;
								}
								break;
							}
						}
					}
				}
			}
		}
		
		if (moreChanges) this.recursion();
	}
function(commonAncestorContainer) {
		// if no parameter was passed, calculate it
		if (!commonAncestorContainer) {
			// this will be needed either right now for finding the CAC or later for the crossing index
			var parentsStartContainer = this.getStartContainerParents(),
				parentsEndContainer = this.getEndContainerParents(),
				i;

			// find the crossing between startContainer and endContainer parents (=commonAncestorContainer)
			if (!(parentsStartContainer.length > 0 && parentsEndContainer.length > 0)) {
				console.warn('could not find commonAncestorContainer');
				return false;
			}

			for (i = 0; i < parentsStartContainer.length; i++) {
				if (parentsEndContainer.index( parentsStartContainer[ i ] ) != -1) {
					this.commonAncestorContainer = parentsStartContainer[ i ];
					break;
				}
			}
		} else {
			this.commonAncestorContainer = commonAncestorContainer;
		}

		// if everything went well, return true :-)
		console.debug(commonAncestorContainer? 'commonAncestorContainer was set successfully' : 'commonAncestorContainer was calculated successfully');
		return true;
	}